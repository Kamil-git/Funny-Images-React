import React from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import CollectionItem from "./CollectionItem"


import Grid from "@mui/material/Grid"

export default function ViewCollection() {
  return (
    <div>
      <Navbar />
      <div className="min-vh-100">
        <Grid
          justifyContent="center"
          alignItems="center"
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(5)).map((_, index) => (
            <CollectionItem key={index}></CollectionItem>
          ))}
        </Grid>
      </div>
      <Footer />
    </div>
  )
}
