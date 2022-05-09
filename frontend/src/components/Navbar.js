import React from "react"
import ColorMode from "../page/ColorMode"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
function Navbar() {
  const { userInfo } = useSelector((state) => state.users)

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <ColorMode />
          <li className="nav-item dropdown ">
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
          </li>
        </ul>
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
              {userInfo ? (
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
                      <Link to="" className="nav-link text-reset">
                        Create Collection
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link text-reset">
                        View Collections
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="" className="nav-link text-reset">
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
                      <Link to="" className="nav-link text-reset">
                        View Collections
                      </Link>
                    </li>
                  </ul>
                </li>
              )}

              {userInfo ? null : (
                <li className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    Register
                  </Link>
                </li>
              )}

              {userInfo ? (
                <li className="nav-item">
                  <Link className="nav-link text-reset" to="/">
                    Logout
                  </Link>
                </li>
              ) : null}
            </ul>
            <form className="d-flex input-group w-auto">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
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
