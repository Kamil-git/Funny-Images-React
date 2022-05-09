import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./page/Main"
import "./App.css"

import Home from "./page/Home"


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
