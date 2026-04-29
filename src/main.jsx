import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root.jsx'
import './index.css'
import ProtoRouter from './proto/ProtoRouter.jsx'

const proto = new URLSearchParams(window.location.search).get('proto')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {proto ? (
      <ProtoRouter proto={proto} />
    ) : (
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    )}
  </React.StrictMode>
)
