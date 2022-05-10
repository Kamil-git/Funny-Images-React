import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./page/Main"
import "./App.css"
import ManageUsers from "./components/admin/ManageUsers"
import ViewCollection from "./components/collection/ViewCollection"
import CreateCollection from "./components/collection/CreateCollection"






function App() {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route
            exact
            path="/create-collection"
            element={<CreateCollection />}
          ></Route>
          <Route exact path="/manage-users" element={<ManageUsers />}></Route>
          <Route
            exact
            path="/view-collections"
            element={<ViewCollection />}
          ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
