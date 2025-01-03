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
      <main className="mt-20 flex-1 bg-primary-3 text-primary-4 p-4">
        <Router />
      </main>
        <Toaster />
    </div>
  )
}

export default App
