import React from "react"
import Router from './Router/Router'
import Navbar from "./Components/Navbar"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main className="mt-20 flex-1 bg-primary-default p-4">
        <Router />
        <Toaster />
      </main>
    </div>
  )
}

export default App
