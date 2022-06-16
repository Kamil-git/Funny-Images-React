import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import {
  Box,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material"
import i18next from "i18next"
import React from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import Flag from "react-world-flags"
import DoneIcon from "@mui/icons-material/Done"
function SwitchLanguage() {
  const [open, setOpen] = React.useState(false)
  const { t } = useTranslation()
  const switchLanguage = () => {
    if (i18next.language === "en") {
      return i18next.changeLanguage("pl")
    } else {
      i18next.changeLanguage("en")
    }
  }
  const onClickAwayListener = () => {
    setOpen(false)
  }
  
  return (
    <ClickAwayListener onClickAway={onClickAwayListener}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ListItemButton
          sx={{
            width: "100%",
            height: "25px",
          }}
          onClick={() => setOpen(!open)}
        >
          {i18next.language === "en" ? (
            <Flag
              code="gb"
              height="16"
              width="22"
              style={{ display: "block" }}
            />
          ) : (
            <Flag code="pol" height="16" width="22" />
          )}
        </ListItemButton>
        {open ? (
          <List
            sx={{
              bgcolor:"background.paper",
              color: "#000",
              border: "1px solid #000",
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "80px",
              cursor: "pointer",
              zIndex: "1",
            }}
          >
            <ListItem>
              <Box sx={{color:'text.primary'}} onClick={() => switchLanguage()}>
                <Flag code="gb" height="16" width="22" />
                {t("English")}
                {i18next.language === "en" ? <DoneIcon color="success" /> : null}
              </Box>
            </ListItem>
            <ListItem>
              <Box sx={{color:'text.primary'}} onClick={() => switchLanguage()}>
                <Flag code="pol" height="16" width="22" />
                {t("Polish")}
                {i18next.language === "pl" ? <DoneIcon color="success" /> : null}
              </Box>
            </ListItem>
          </List>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}

export default SwitchLanguage
