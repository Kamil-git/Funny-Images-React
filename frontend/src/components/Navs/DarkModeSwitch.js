import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"





export default function DarkModeSwitch() {
 const swapStyle=()=>{
  document.body.classList.toggle("bootstrap-dark")
  }
  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={()=> swapStyle()}
      color="inherit"
    >
       <Brightness4Icon />
    </IconButton>
  )
}
