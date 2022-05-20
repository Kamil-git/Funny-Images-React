import Brightness4 from "@mui/icons-material/Brightness4"
import Brightness7 from "@mui/icons-material/Brightness7"
import { FormControlLabel, FormGroup, Switch } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { toggleTheme } from "../../redux/slices/theme/themeSlice"
import * as React from "react"
export const ToggleSwitch = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme)
  const { darkTheme } = theme

  React.useEffect(() => {
    darkTheme === "light"
      ? localStorage.setItem("theme", "light")
      : localStorage.setItem("theme", "dark")
  }, [darkTheme])

  return (
    <div>
      <Switch
        checked={theme?.darkTheme}
        onChange={() => dispatch(toggleTheme())}
      />
      {theme?.darkTheme ? <Brightness4 /> : <Brightness7 />}
    </div>
  )
}
