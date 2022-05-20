import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff",
    },
    text: {
      primary: "#222",
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222",
      
     
    },
    text: {
      primary: "#fff",
    },
  },
})

