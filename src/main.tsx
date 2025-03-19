import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
// Import Ant Design CSS for v5
import 'antd/dist/reset.css'
import './index.css'

// Get the base URL from environment variables or use default
const baseUrl = import.meta.env.VITE_PUBLIC_URL || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)