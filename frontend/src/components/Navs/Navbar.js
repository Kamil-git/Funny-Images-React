import { Box,  ButtonGroup,  Stack, } from "@mui/material"
import * as React from "react"
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import { useTranslation } from "react-i18next"

import UserIcon from "./NavIcons/UserIcon"
import i18next from "i18next"
import { ToggleSwitch } from "./ToggleSwitch"
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)
  const { t } = useTranslation()
  const switchLanguage = () => {
    if (i18next.language === "en") {
      return i18next.changeLanguage("pl")
    } else {
      i18next.changeLanguage("en")
    }
  }

  const collection = useSelector((state) => state?.collection.collectionList)

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
      className="navbar navbar-expand-lg "
    >
      <ButtonGroup
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <MenuIcon />
      </ButtonGroup>
      <Box className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Stack minWidth="100%" className="navbar-nav">
          <Box className="d-flex" style={{ flexBasis: "100%" }}>
            <Box className="iconNav" sx={{alignSelf:"center"}}>
              <ToggleSwitch />
            </Box>

            <Box className="nav-item dropdown iconNav2">
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
          </Box>

          <Box className="d-flex wraplist">
            {userAuth?.isAdmin ? (
              <Box
                className="nav-item dropdown"
                sx={{ maxWidth: "max-content", ml: 1 }}
              >
                <Link
                  to=""
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuspannk"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <Box
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuspannk"
                >
                  <Box className="dropdown-item">
                    <Link to="/manage-users" className="nav-link">
                      {t("Manage_Users")}
                    </Link>
                    <Link to="/admin-collection" className="nav-link">
                      {t("Manage_users_collections")}
                    </Link>
                  </Box>
                </Box>
              </Box>
            ) : null}
            {userAuth ? (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  className="nav-item dropdown"
                  sx={{ maxWidth: "max-content", ml: 1 }}
                >
                  <Link
                    to=""
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("Collection")}
                  </Link>
                  <Box
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Box className="dropdown-item">
                      <Link to="/create-collection" className="nav-link">
                        {t("Create_Collection")}
                      </Link>
                    </Box>
                    <Box className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        {t("View_Collections")}
                      </Link>
                    </Box>
                    <Box className="dropdown-item">
                      <Link to="/my-collections" className="nav-link">
                        {t("My_Collections")}
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className="nav-item"
                  sx={{ maxWidth: "max-content", ml: 1 }}
                >
                  <Link
                    to=""
                    className="nav-link"
                    onClick={() =>
                      dispatch(logoutAction()).then(() => {
                        navigate("/")
                      })
                    }
                  >
                    {t("Logout")}
                  </Link>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("Collection")}
                  </Link>
                  <Box
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <Box className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        {t("View_Collections")}
                      </Link>
                    </Box>
                  </Box>
                </Box>
                <Box
                  className="nav-item"
                  sx={{ minWidth: "fit-content"}}
                >
                  <Link className="nav-link" to="/">
                    {t("Login")}
                  </Link>
                </Box>
              </Box>
            )}
            <Box className="nav-link">
              <UserIcon />
            </Box>

            <Box sx={{ mr: 1, minWidth: "8rem" }}>
              <SearchBar data={collection} />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Navbar
