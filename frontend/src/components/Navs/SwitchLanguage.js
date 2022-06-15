import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import i18next from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function SwitchLanguage() {
  const [open,setOpen] = React.useState(false)
    const {t} = useTranslation()
     const switchLanguage = () => {
       if (i18next.language === "en") {
         return i18next.changeLanguage("pl")
       } else {
         i18next.changeLanguage("en")
       }
     }
  return (
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
        <ListItemText
          sx={{ justifyContent: "center" }}
          primary={
            i18next.language === "en" ? (
              <i className="flag-united-kingdom flag m-0"></i>
            ) : (
              <i className="flag-poland flag"></i>
            )
          }
        />
      </ListItemButton>
      {open ? (
        <List
          sx={{
            backgroundColor: "#fff",
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
            <Box onClick={() => switchLanguage()}>
              <i className="flag-united-kingdom flag"></i>
              {t("English")}
              {i18next.language === "en" ? (
                <i className="fa fa-check text-success ms-2"></i>
              ) : null}
            </Box>
          </ListItem>
          <ListItem>
            <Box onClick={() => switchLanguage()}>
              <i className="flag-poland flag"></i>
              {t("Polish")}
              {i18next.language === "pl" ? (
                <i className="fa fa-check text-success ms-2"></i>
              ) : null}
            </Box>
          </ListItem>
        </List>
      ) : null}
    </Box>
  )
}

export default SwitchLanguage