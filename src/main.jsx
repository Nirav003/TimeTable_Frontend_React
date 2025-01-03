import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './Context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContext>
      <StrictMode>
        <App />
      </StrictMode>
    </UserContext>
  </BrowserRouter>
)
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
