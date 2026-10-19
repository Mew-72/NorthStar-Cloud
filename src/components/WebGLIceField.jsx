import { useEffect, useRef } from 'react'

const vertexShader = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = (aPosition + 1.0) * 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`

// A small procedural shader: a translucent, faceted ice shard that drifts with
// scroll progress and pointer position. No model, texture, or large 3D bundle.
const fragmentShader = `
  precision mediump float;

  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;

  mat2 rotate2d(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }

  void main() {
    vec2 p = vUv - 0.5;
    p.x *= uResolution.x / max(uResolution.y, 1.0);
    p += (uPointer - 0.5) * vec2(0.07, 0.05);
    p.y += sin(uTime * 0.16) * 0.018;
    p = rotate2d(0.06 * sin(uTime * 0.12) + (uScroll - 0.5) * 0.24) * p;
    p.y += 0.025;

    // A tall diamond-like shard with a fine, animated faceted surface.
    float d = abs(p.x) * 0.88 + abs(p.y) * 0.55;
    float body = 1.0 - smoothstep(0.285, 0.315, d);
    float rim = exp(-abs(d - 0.30) * 52.0);
    float halo = exp(-max(d - 0.31, 0.0) * 9.0) * (1.0 - body);

    float bands = sin((p.x * 7.0 + p.y * 4.0 + uScroll * 1.8) * 5.0 + uTime * 0.12);
    float facet = smoothstep(-0.65, 0.85, bands);
    float seams = 1.0 - smoothstep(0.0, 0.025, abs(fract((p.x * 3.0 + p.y * 1.8 + uScroll * 0.12) * 6.0) - 0.5));

    vec3 ice = mix(vec3(0.82, 0.94, 1.0), vec3(0.67, 0.70, 0.94), facet * 0.8);
    ice = mix(ice, vec3(0.46, 0.91, 0.88), smoothstep(0.08, 0.34, p.x + 0.1) * 0.38);
    ice = mix(ice, vec3(1.0, 0.72, 0.78), 1.0 - smoothstep(-0.16, 0.20, p.x - p.y * 0.35) * 0.24);
    ice += vec3(0.28, 0.23, 0.35) * seams * body * 0.28;

    float glint = pow(max(0.0, 1.0 - abs(p.x * 1.6 + p.y * 0.72 - 0.02 - uPointer.x * 0.06)), 28.0);
    ice += vec3(0.86, 0.96, 1.0) * glint * body * 0.72;

    float alpha = body * 0.52 + rim * 0.34 + halo * 0.13 + glint * body * 0.2;
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(ice, min(alpha, 0.86));
  }
`

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function WebGLIceField() {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactViewport = window.matchMedia('(max-width: 767px)')
    if (reducedMotion.matches || compactViewport.matches) return

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
      premultipliedAlpha: false,
    })
    if (!gl) return

    const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
      return
    }

    const program = gl.createProgram()
    if (!program) {
      gl.deleteShader(vertex)
      gl.deleteShader(fragment)
      return
    }
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }

    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      return
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    gl.useProgram(program)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const pointerLocation = gl.getUniformLocation(program, 'uPointer')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const scrollLocation = gl.getUniformLocation(program, 'uScroll')
    let pointer = [0.5, 0.5]
    let visible = false
    let rafId = 0
    let startedAt = performance.now()

    const resize = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.35)
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    const onPointerMove = (event) => {
      const rect = host.getBoundingClientRect()
      pointer = [
        Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)),
        1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height)),
      ]
    }
    const onPointerLeave = () => { pointer = [0.5, 0.5] }

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
    }
    const draw = (now) => {
      rafId = 0
      if (!visible || document.visibilityState !== 'visible') return
      resize()
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(pointerLocation, pointer[0], pointer[1])
      gl.uniform1f(timeLocation, (now - startedAt) / 1000)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      gl.uniform1f(scrollLocation, window.scrollY / maxScroll)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafId = requestAnimationFrame(draw)
    }
    const start = () => {
      if (visible && document.visibilityState === 'visible' && !rafId) {
        rafId = requestAnimationFrame(draw)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    }, { threshold: 0.01 })
    observer.observe(host)

    const onVisibility = () => document.visibilityState === 'visible' ? start() : stop()
    const onMotionChange = (event) => { if (event.matches) stop() }
    const onViewportChange = (event) => { if (event.matches) stop() }

    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', resize, { passive: true })
    reducedMotion.addEventListener?.('change', onMotionChange)
    compactViewport.addEventListener?.('change', onViewportChange)
    resize()
    start()

    return () => {
      stop()
      observer.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', resize)
      reducedMotion.removeEventListener?.('change', onMotionChange)
      compactViewport.removeEventListener?.('change', onViewportChange)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return (
    <div ref={hostRef} className="northstar-ice-field pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <div className="northstar-ice-fallback absolute inset-0" />
      <canvas ref={canvasRef} className="northstar-ice-canvas absolute inset-0 h-full w-full" />
    </div>
  )
}
