import {
  Box,
  ButtonGroup,
  ClickAwayListener,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material"
import * as React from "react"
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import { useTranslation } from "react-i18next"
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown"
import UserIcon from "./NavIcons/UserIcon"
import useWindowDimensions from "../../hooks/WindowDimensionHook"
import { ToggleSwitch } from "./ToggleSwitch"
import MenuIcon from "@mui/icons-material/Menu"
import SwitchLanguage from "./SwitchLanguage"

function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const { height, width } = useWindowDimensions()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)
  const { t } = useTranslation()

  const collection = useSelector((state) => state?.collection.collectionList)
  React.useEffect(() => {
    if (width > 990) {
      setExpanded(true)
    }
  }, [width])
  const onClickAwayListener = () => {
    setOpen(false)
  }
  const onClickAwayListener1 = () => {
    setOpen1(false)
  }
  const onClickAwayListener2 = () => {
    setOpen1(false)
  }

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        boxShadow: "rgba(117, 115, 115, 0.25) 0px 1px 12px;",
      }}
      className="header__navigation"
    >
      <Box className="navbar__toggler">
        <ListItemButton onClick={() => setExpanded(!expanded)}>
          <MenuIcon sx={{ cursor: "pointer" }} />
        </ListItemButton>
      </Box>

      {expanded ? (
        <Stack className="hide__navbar">
          <Box style={{ display: "flex", flexBasis: "100%" }}>
            <Box className="iconNav" sx={{ alignSelf: "center" }}>
              <ToggleSwitch />
            </Box>
            <SwitchLanguage />
            <Box className="navbar__logo">Funny Images</Box>
          </Box>

          <Box sx={{ display: "flex" }} className="wraplist">
            {userAuth?.isAdmin ? (
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
                    disableGutters
                    onClick={() => setOpen(!open)}
                  >
                    <ListItemText primary="Admin" />
                    <KeyboardArrowDown
                      sx={{
                        opacity: 0,
                        transform: open ? "rotate(-180deg)" : "rotate(0)",
                        transition: "0.2s",
                      }}
                    />
                  </ListItemButton>
                  {open ? (
                    <List
                      sx={{
                        bgcolor: "background.paper",
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
                        <Link to="/manage-users">
                          <Box sx={{ color: "text.primary" }}>
                            {t("Manage_Users")}
                          </Box>
                        </Link>
                      </ListItem>
                      <ListItem>
                        <Link to="/admin-collection">
                          <Box sx={{ color: "text.primary" }}>
                            {t("Manage_users_collections")}
                          </Box>
                        </Link>
                      </ListItem>
                    </List>
                  ) : null}
                </Box>
              </ClickAwayListener>
            ) : null}

            {userAuth ? (
              <ClickAwayListener onClickAway={onClickAwayListener1}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
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
                      disableGutters
                      onClick={() => setOpen1(!open1)}
                    >
                      <ListItemText primary={t("Collection")} />
                      <KeyboardArrowDown
                        sx={{
                          opacity: 0,
                          transform: open1 ? "rotate(-180deg)" : "rotate(0)",
                          transition: "0.2s",
                        }}
                      />
                    </ListItemButton>
                    {open1 ? (
                      <List
                        sx={{
                          bgcolor: "background.paper",
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
                        <ListItem sx={{ color: "text.primary" }}>
                          <Link to="/create-collection">
                            <Box sx={{ color: "text.primary" }}>
                              {t("Create_Collection")}
                            </Box>
                          </Link>
                        </ListItem>
                        <ListItem sx={{ color: "text.primary" }}>
                          <Link to="/view-collections">
                            <Box sx={{ color: "text.primary" }}>
                              {" "}
                              {t("View_Collections")}
                            </Box>
                          </Link>
                        </ListItem>
                        <ListItem sx={{ color: "text.primary" }}>
                          <Link to="/my-collections">
                            <Box sx={{ color: "text.primary" }}>
                              {t("My_Collections")}
                            </Box>
                          </Link>
                        </ListItem>
                      </List>
                    ) : null}
                  </Box>
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
                      disableGutters
                      onClick={() => dispatch(logoutAction())}
                    >
                      <ListItemText primary={t("Logout")} />
                    </ListItemButton>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItem
                      sx={{
                        width: "100%",
                        height: "25px",
                      }}
                    >
                      <ListItemText primary={<UserIcon />} />
                    </ListItem>
                  </Box>
                </Box>
              </ClickAwayListener>
            ) : (
              <ClickAwayListener onClickAway={onClickAwayListener2}>
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
                    disableGutters
                    onClick={() => setOpen2(!open2)}
                  >
                    {t("Collection")}
                    <KeyboardArrowDown
                      sx={{
                        opacity: 0,
                        transform: open1 ? "rotate(-180deg)" : "rotate(0)",
                        transition: "0.2s",
                      }}
                    />
                  </ListItemButton>
                  {open2 ? (
                    <List
                      sx={{
                        bgcolor: "background.paper",
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
                        <Link to="/view-collections">
                          <Box sx={{ color: "text.primary" }}>
                            {t("View_Collections")}
                          </Box>
                        </Link>
                      </ListItem>
                    </List>
                  ) : null}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItemButton sx={{ height: "25px" }}>
                      <Link to="/">
                        <Box sx={{ color: "text.primary" }}>{t("Login")}</Box>
                      </Link>
                    </ListItemButton>
                  </Box>
                </Box>
              </ClickAwayListener>
            )}

            <Box sx={{ mr: 1, minWidth: "8rem" }}>
              <SearchBar data={collection} />
            </Box>
          </Box>
        </Stack>
      ) : null}
    </Box>
  )
}

export default Navbar
