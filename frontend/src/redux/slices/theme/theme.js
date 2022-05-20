import { createTheme } from "@mui/material"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      paper: "#fff",
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
      paper: "#222",
     
    },
    text: {
      primary: "#fff",
    },
  },
})
