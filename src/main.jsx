import React from 'react'
import ReactDOM from 'react-dom/client'
import AcmeApp from './AcmeApp.jsx'
import SmoothScroll from './components/SmoothScroll.jsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <SmoothScroll />
      <AcmeApp />
    </>
  </React.StrictMode>,
)
