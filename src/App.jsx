import React from "react"
import Router from './Router/Router'
import Navbar from "./Components/Navbar"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div className="h-full flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="py-20 flex-1 bg-test2-5 p-4">
        <Router />
        <Toaster />
      </main>
    </div>
  )
}

export default App
// import { useState } from 'react'
// import TogglePage from './Components/Auth/TogglePage'
// import './App.css'

// function App() {

//   return (
//     <>
//       <div>
//         <TogglePage/>
//       </div>
//     </>
//   )
// }

// export default App
