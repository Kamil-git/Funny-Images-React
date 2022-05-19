import { TextField } from "@mui/material"
import React from "react"
import SearchBar from "./SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import { useTranslation } from "react-i18next"
import DarkModeSwitch from "./DarkModeSwitch"
import UserIcon from "./NavIcons/UserIcon"
import i18next from "i18next"
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)
  const {t} = useTranslation()
 const switchLanguage=()=> {
   if(i18next.language === "en"){
    return i18next.changeLanguage("pl")
   } else {
     i18next.changeLanguage("en")
   }
 }
 const collection = useSelector((state) => state?.collection.collectionList)

  return (
    <div className="navbar navbar-expand-lg " style={{ marginBottom: "1rem" }}>
      <button
        className="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarTogglerDemo01"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars"></i>
      </button>
      <div className="collapse navbar-collapse p-1" id="navbarTogglerDemo01">
        <div className="container-fluid navbar-nav">
          <div className="d-flex" style={{ flexBasis: "100%" }}>
            <span>
              <DarkModeSwitch />
            </span>
            <div className="nav-item dropdown ">
              <span
                className="nav-link dropdown-toggle text-reset"
                to="#"
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="flag-united-kingdom flag m-0"></i>
              </span>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <span>
                  <p className="dropdown-item" onClick={() => switchLanguage()}>
                    <i className="flag-united-kingdom flag"></i>
                    {t("English")}
                    {i18next.language === "en" ? (
                      <i className="fa fa-check text-success ms-2"></i>
                    ) : null}
                  </p>
                </span>

                <span>
                  <hr className="dropdown-divider" />
                </span>
                <span>
                  <p className="dropdown-item" onClick={() => switchLanguage()}>
                    <i className="flag-poland flag"></i>
                    {t("Polish")}
                    {i18next.language === "pl" ? (
                      <i className="fa fa-check text-success ms-2"></i>
                    ) : null}
                  </p>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex">
            {userAuth?.isAdmin ? (
              <div className="nav-item dropdown">
                <Link
                  to=""
                  className="nav-link dropdown-toggle text-reset"
                  id="navbarDropdownMenuspannk"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <span
                  className="dropdown-menu text-reset"
                  aria-labelledby="navbarDropdownMenuspannk"
                >
                  <span className="dropdown-item">
                    <Link to="/manage-users" className="nav-link">
                      {t("Manage_Users")}
                    </Link>
                  </span>
                </span>
              </div>
            ) : null}
            {userAuth ? (
              <>
                <div className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle text-reset"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("Collection")}
                  </Link>
                  <span
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <span className="dropdown-item">
                      <Link to="/create-collection" className="nav-link">
                        {t("Create_Collection")}
                      </Link>
                    </span>
                    <span className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        {t("View_Collections")}
                      </Link>
                    </span>
                    <span className="dropdown-item">
                      <Link to="/my-collections" className="nav-link">
                        {t("My_Collections")}
                      </Link>
                    </span>
                  </span>
                </div>
                <div className="nav-item">
                  <span
                    className="nav-link text-reset"
                    type="button"
                    onClick={() =>
                      dispatch(logoutAction()).then(() => {
                        navigate("/")
                      })
                    }
                  >
                    {t("Logout")}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="nav-item dropdown">
                  <Link
                    to=""
                    className="nav-link dropdown-toggle text-reset"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {t("Collection")}
                  </Link>
                  <span
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <span className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        {t("View_Collections")}
                      </Link>
                    </span>
                  </span>
                </div>
                <span className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    {t("Register")}
                  </Link>
                </span>
              </>
            )}
            <span className="nav-link">
              <UserIcon />
            </span>
            <div className="nav">
              <SearchBar data={collection} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
