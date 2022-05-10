import React from "react"

import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logoutAction } from "../../redux/slices/users/usersSlices"
import DarkModeSwitch from "./DarkModeSwitch"
function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { userAuth } = useSelector((state) => state.users)

  return (
    <nav className="navbar navbar-expand-lg " style={{marginBottom:'1rem'}}>
      <div className="container-fluid">
        <div className="d-flex justify-content-start ">
          <span>
            <DarkModeSwitch />
          </span>
          <div className="nav-item dropdown ">
            <Link
              className="nav-link dropdown-toggle text-reset"
              to="#"
              id="navbarDropdown"
              role="button"
              data-mdb-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="flag-united-kingdom flag m-0"></i>
            </Link>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="flag-united-kingdom flag"></i>English
                  <i className="fa fa-check text-success ms-2"></i>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  <i className="flag-poland flag"></i>Polski
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="d-flex justifty-content-end">
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
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                    <li className="nav-item">
                      <Link to="/manage-users" className="nav-link">
                        Manage Users
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : null}
              {userAuth ? (
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
                    <li className="nav-item">
                      <Link to="/create-collection" className="nav-link">
                        Create Collection
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/view-collections" className="nav-link">
                        View Collections
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link">
                        Edit Collections
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
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
                    <li className="nav-item">
                      <Link to="/view-collections" className="nav-link">
                        View collections
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              {userAuth ? null : (
                <li className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    Register
                  </Link>
                </li>
              )}

              {userAuth ? (
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
              ) : null}
            </ul>
            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn "
                type="button"
                data-mdb-ripple-color="dark"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
