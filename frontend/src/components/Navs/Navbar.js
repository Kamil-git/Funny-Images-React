import { TextField } from "@mui/material"
import React from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import DarkModeSwitch from "./DarkModeSwitch"
import UserIcon from "./NavIcons/UserIcon"
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)
  
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
                  <p className="dropdown-item" to="#">
                    <i className="flag-united-kingdom flag"></i>Engspansh
                    <i className="fa fa-check text-success ms-2"></i>
                  </p>
                </span>
                <span>
                  <hr className="dropdown-divider" />
                </span>
                <span>
                  <p className="dropdown-item" to="#">
                    <i className="flag-poland flag"></i>Polski
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
                      Manage Users
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
                    Collection
                  </Link>
                  <span
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <span className="dropdown-item">
                      <Link to="/create-collection" className="nav-link">
                        Create Collection
                      </Link>
                    </span>
                    <span className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        View Collections
                      </Link>
                    </span>
                    <span className="dropdown-item">
                      <Link to="/my-collections" className="nav-link">
                        My Collections
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
                    Logout
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
                    Collection
                  </Link>
                  <span
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <span className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        View collections
                      </Link>
                    </span>
                  </span>
                </div>
                <span className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    Register
                  </Link>
                </span>
              </>
            )}
            <span className="nav-link">
              <UserIcon />
            </span>
            <span className="nav-item">
              <form>
                <TextField
                  sx={{ minWidth: "5rem", color: "inherit" }}
                  variant="standard"
                  fullWidth
                  placeholder="Search"
                />
              </form>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
