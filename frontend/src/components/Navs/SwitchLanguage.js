import { Box } from '@mui/material'
import i18next from 'i18next'
import React from 'react'
import { useTranslation } from 'react-i18next'

function SwitchLanguage() {
    const {t} = useTranslation()
     const switchLanguage = () => {
       if (i18next.language === "en") {
         return i18next.changeLanguage("pl")
       } else {
         i18next.changeLanguage("en")
       }
     }
  return (
    <Box className="nav-item dropdown iconNav2" sx={{alignSelf:"center"}}>
      <Box
        className="nav-link dropdown-toggle text-reset"
        to="#"
        id="navbarDropdown"
        role="button"
        data-mdb-toggle="dropdown"
        aria-expanded="false"
      >
        {i18next.language === "en" ? (
          <i className="flag-united-kingdom flag m-0"></i>
        ) : (
          <i className="flag-poland flag"></i>
        )}
      </Box>
      <Box className="dropdown-menu " aria-labelledby="navbarDropdown">
        <Box>
          <p className="dropdown-item" onClick={() => switchLanguage()}>
            <i className="flag-united-kingdom flag"></i>
            {t("English")}
            {i18next.language === "en" ? (
              <i className="fa fa-check text-success ms-2"></i>
            ) : null}
          </p>
        </Box>

        <Box>
          <p className="dropdown-item" onClick={() => switchLanguage()}>
            <i className="flag-poland flag"></i>
            {t("Polish")}
            {i18next.language === "pl" ? (
              <i className="fa fa-check text-success ms-2"></i>
            ) : null}
          </p>
        </Box>
      </Box>
    </Box>
  )
}

export default SwitchLanguage