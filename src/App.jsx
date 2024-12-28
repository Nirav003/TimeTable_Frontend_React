import React from "react"
import Router from './Router/Router'
import Navbar from "./Components/Navbar"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-[120px] bg-primary-default h-screen w-screen">
        <Router />
        <Toaster />
      </div>
    </>
  )
}

export default App
