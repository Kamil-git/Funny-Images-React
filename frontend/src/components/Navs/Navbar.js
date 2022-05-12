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
  console.log(userAuth)
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
        <ul className="container-fluid navbar-nav">
          <div className="d-flex" style={{ flexBasis: "100%" }}>
            <li>
              <DarkModeSwitch />
            </li>
            <li className="nav-item dropdown ">
              <li
                className="nav-link dropdown-toggle text-reset"
                to="#"
                id="navbarDropdown"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="flag-united-kingdom flag m-0"></i>
              </li>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <p className="dropdown-item" to="#">
                    <i className="flag-united-kingdom flag"></i>English
                    <i className="fa fa-check text-success ms-2"></i>
                  </p>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <p className="dropdown-item" to="#">
                    <i className="flag-poland flag"></i>Polski
                  </p>
                </li>
              </ul>
            </li>
          </div>

          <div className="d-flex">
            {userAuth?.isAdmin ? (
              <li className="nav-item dropdown">
                <Link
                  to=""
                  className="nav-link dropdown-toggle text-reset"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </Link>
                <ul
                  className="dropdown-menu text-reset"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li className="dropdown-item">
                    <Link to="/manage-users" className="nav-link">
                      Manage Users
                    </Link>
                  </li>
                </ul>
              </li>
            ) : null}
            {userAuth ? (
              <>
                <li className="nav-item dropdown">
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
                  <ul
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="dropdown-item">
                      <Link to="/create-collection" className="nav-link">
                        Create Collection
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        View Collections
                      </Link>
                    </li>
                    <li className="dropdown-item">
                      <Link to="/my-collections" className="nav-link">
                        My Collections
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
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
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown">
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
                  <ul
                    className="dropdown-menu text-reset"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="dropdown-item">
                      <Link to="/view-collections" className="nav-link">
                        View collections
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    Register
                  </Link>
                </li>
              </>
            )}
            <li className="nav-link">
              <UserIcon />
            </li>
            <li className="nav-item">
              <form>
                <TextField
                  sx={{ minWidth: "5rem", color: "inherit" }}
                  variant="standard"
                  fullWidth
                  placeholder="Search"
                />
              </form>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
