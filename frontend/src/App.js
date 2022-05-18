import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./page/Main"

import ManageUsers from "./components/admin/ManageUsers"
import CreateCollection from './components/collection/CreateCollection'
import ViewCollection from "./components/collection/ViewCollections/ViewCollection"
import MyCollections from "./components/collection/MyCollections/MyCollections"







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
          <Route
            exact
            path="/my-collections"
            element={<MyCollections />}
          ></Route>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
