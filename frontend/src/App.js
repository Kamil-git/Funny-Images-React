import * as React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./page/Main"

import ManageUsers from "./components/admin/ManageUsers"
import CreateCollection from "./components/collection/CreateCollection"
import ViewCollection from "./components/collection/ViewCollections/ViewCollection"
import MyCollections from "./components/collection/MyCollections/MyCollections"
import { useDispatch, useSelector } from "react-redux"

import { darkTheme, lightTheme } from "./redux/slices/theme/theme"
import { ThemeProvider } from "@mui/material/styles"
export default function App() {
  // get theme from store
  const theme = useSelector((state) => state.theme)

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
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
    </ThemeProvider>
  )
}
