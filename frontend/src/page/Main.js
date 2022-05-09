import React from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik"
import ColorMode from "./ColorMode"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {
  loginUserAction,
  registerUserAction,
} from "../redux/slices/users/usersSlices"
//register schema
const formSchema = Yup.object({
  name: Yup.string().required("First Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  password2: Yup.string().required("Password2 is required"),
})
//login schema
const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
})

function Main() {
  //dispatch
  const dispatch = useDispatch()
  //-----------------------------------------------register
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
    },
    onSubmit: (values) => {
      values.password === values.password2
        ? dispatch(registerUserAction(values))
        : console.log("Passwords are not equal")
    },
    validationSchema: formSchema,
  })
  //---------------------------------------------------login
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values))
      console.log(values)
    },
    validationSchema: loginSchema,
  })

  //select state from store
  const storeData = useSelector((store) => store?.users)
  const { loading, appErr, serverErr, registered, userAuth } = storeData
  if (registered) {
    return <Link to="/profile" />
  }
  console.log(userAuth)
  // if (userAuth) {
  //   return <Link to="/profile" />
  // }

  return (
    <div className="w-100 p-4 d-flex justify-content-center pb-4">
      <div style={{ width: "26rem" }}>
        <ul
          className="nav nav-tabs justify-content-center mb-3"
          id="myTab"
          role="tablist"
        >
          <li className="nav-item">
            <a
              className="nav-link active"
              id="login-tab"
              data-toggle="tab"
              href="#login"
              role="tab"
              aria-controls="login"
              aria-selected="true"
            >
              Login
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="register-tab"
              data-toggle="tab"
              href="#register"
              role="tab"
              aria-controls="register"
              aria-selected="false"
            >
              Register
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div
            className="tab-pane active"
            id="login"
            role="tabpanel"
            aria-labelledby="login-tab"
          >
            <form onSubmit={formikLogin.handleSubmit}>
              <div className="text-center mb-4">
                <p>Sign in with:</p>
                <Link to="#" className="btn  btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </Link>

                <Link to="#" className="btn  btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </Link>

                <Link to="#" className="btn  btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </Link>

                <Link to="#" className="btn  btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </Link>
              </div>

              <p className="text-center">or:</p>

              <div className="form-outline mb-4 text-center">
                <input
                  onChange={formikLogin.handleChange("email")}
                  value={formikLogin.values.email}
                  onBlur={formikLogin.handleBlur("email")}
                  type="email"
                  id="loginName"
                  className="form-control active"
                />
                <label className="form-label ">Email</label>
              </div>

              <div className="form-outline mb-4 text-center">
                <input
                  onChange={formikLogin.handleChange("password")}
                  value={formikLogin.values.password}
                  onBlur={formikLogin.handleBlur("password")}
                  type="password"
                  id="loginPassword"
                  className="form-control active"
                />
                <label className="form-label" htmlFor="loginPassword">
                  Password
                </label>
              </div>
              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-block mb-4">
                  Sign in
                </button>
              )}

              <div className="text-center">
                <p>
                  <ColorMode /> Not a member?<span> </span>
                  <Link className="text-reset" to="/home">
                    Continue
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div
            className="tab-pane"
            id="register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" className="btn btn-floating mx-1">
                  <i className="fab fa-facebook-f"></i>
                </button>

                <button type="button" className="btn btn-floating mx-1">
                  <i className="fab fa-google"></i>
                </button>

                <button type="button" className="btn btn-floating mx-1">
                  <i className="fab fa-twitter"></i>
                </button>

                <button type="button" className="btn btn-floating mx-1">
                  <i className="fab fa-github"></i>
                </button>
              </div>

              <p className="text-center">or:</p>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  className="form-control active"
                  onChange={formik.handleChange("name")}
                  value={formik.values.name}
                  onBlur={formik.handleBlur("name")}
                />
                <label className="form-label">Name</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control active"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <label className="form-label">Email</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control active"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <label className="form-label">Password</label>
              </div>

              <div className="form-outline mb-4">
                <input
                  value={formik.values.password2}
                  onChange={formik.handleChange("password2")}
                  onBlur={formik.handleBlur("password2")}
                  type="password"
                  className="form-control active"
                />
                <label className="form-label">Repeat password</label>
              </div>

              {loading ? (
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-block mb-3">
                  Sign in
                </button>
              )}
              {appErr || serverErr ? (
                <div
                  className="toast show fade text-white bg-danger"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                  data-mdb-color="danger"
                  data-mdb-autohide="false"
                >
                  <div className="toast-header text-white bg-danger">
                    <i className="fas fa-exclamation-circle fa-lg me-2"></i>
                    <strong className="me-auto">Error</strong>
                    <small>Try again later</small>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      data-mdb-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="toast-body">
                    {appErr}
                    {serverErr}
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
