import Brightness4 from "@mui/icons-material/Brightness4"
import Brightness7 from "@mui/icons-material/Brightness7"
import {  Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {
  addDarkTheme,
  removeDarkTheme,
  toggleTheme,
} from "../../redux/slices/theme/themeSlice"
import * as React from "react"
export const ToggleSwitch = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const { darkTheme } = theme

  React.useEffect(() => {
    darkTheme ? dispatch(addDarkTheme()) : dispatch(removeDarkTheme())
  }, [darkTheme, dispatch])

  return (
    <span >
      <Switch checked={darkTheme} onChange={() => dispatch(toggleTheme())} sx={{alignSelf:"center"}} />
      {darkTheme ? <Brightness4 /> : <Brightness7 />}
    </span>
  )
}
