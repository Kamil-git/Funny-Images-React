import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Brightness3Icon from "@mui/icons-material/Brightness3"
import Brightness5Icon from "@mui/icons-material/Brightness5"

function ColorMode() {
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={() => document.body.classList.toggle("bootstrap-dark")}
      color="inherit"
    >
      <Brightness5Icon/><Brightness3Icon/>
    </IconButton>
  )
}

export default ColorMode
