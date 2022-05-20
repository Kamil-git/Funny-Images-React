import { createTheme } from "@mui/material"
import { purple } from "@mui/material/colors"

export const lightTheme = createTheme({
  palette: {
    mode: "light",
   
    background: {
      paper: "#fff",
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
      paper: "#333",
    },
    text: {
      primary: "#fff",
    },
  },
})

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
})
