import * as React from "react"
import IconButton from "@mui/material/IconButton"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

export default function DarkModeSwitch() {
  const [darkMode, setDarkMode] = React.useState("")
  const swapStyle = () => {
    if (darkMode === "light") {
      setDarkMode("dark")
      localStorage.setItem("darkMode", "dark")
    } else {
      setDarkMode("light")
      localStorage.setItem("darkMode", "light")
    }
  }
  const preference = localStorage.getItem("darkMode")

  React.useEffect(() => {
    preference === "light" ? setDarkMode("light") : setDarkMode("dark")
    darkMode === "dark"
      ? document.body.classList.toggle("bootstrap-dark")
      : document.body.classList.remove("bootstrap-dark")
  }, [darkMode, preference])

  return (
    <IconButton sx={{ ml: 1 }} onClick={() => swapStyle()} color="inherit">
      {darkMode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
