import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {
  loginUserAction,
  registerUserAction,
} from "../redux/slices/users/usersSlices"
import DarkModeSwitch from "../components/Navs/DarkModeSwitch"
import {
  Alert,
  Button,
  CircularProgress,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { useTranslation } from "react-i18next"

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
  const {t} = useTranslation()
  const navigate = useNavigate()
  //dispatch
  const dispatch = useDispatch()
  //-----------------------------------------------register form
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
  //---------------------------------------------------login form
  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values))
    },
    validationSchema: loginSchema,
  })

  //select state from store
  const storeData = useSelector((store) => store?.users)
  const { loading, appErr, serverErr, registered, userAuth } = storeData

  React.useEffect(() => {
    if (userAuth && !userAuth.isBlocked) {
      navigate("/view-collections")
    }
    if(registered){
      window.location.reload()

    }
    return () => {}
  }, [navigate, userAuth, registered])

  return (
    <div
      id="mainsection"
      className="w-100 p-4 d-flex justify-content-center pb-4"
    >
      <div style={{ width: "26rem" }}>
        <ToggleButtonGroup
          className="d-flex nav nav-tabs justify-content-center mb-3"
          id="myTab"
          role="tablist"
          color="primary"
          exclusive
        >
          <ToggleButton
            color="standard"
            size="medium"
            id="login-tab"
            data-toggle="tab"
            href="#login"
            role="tab"
            aria-controls="login"
            aria-selected="true"
            value="login"
          >
            {t("Login")}
          </ToggleButton>

          <ToggleButton
            color="standard"
            size="medium"
            id="register-tab"
            data-toggle="tab"
            href="#register"
            role="tab"
            aria-controls="register"
            aria-selected="false"
            value="register"
          >
            {t("Register")}
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="tab-content min-vh-100">
          {/* ------------Login-------------  */}
          <div
            className="tab-pane active"
            id="login"
            role="tabpanel"
            aria-labelledby="login-tab"
            
          >
            <form onSubmit={formikLogin.handleSubmit}>
              <div className="text-center mb-4">
                <p>{t("Sign_in_with")}:</p>
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

              <p className="text-center">{t("or")}:</p>

              <div className="form-outline mb-4 text-center">
                <TextField
                  variant="standard"
                  fullWidth
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
                <TextField
                  variant="standard"
                  fullWidth
                  onChange={formikLogin.handleChange("password")}
                  value={formikLogin.values.password}
                  onBlur={formikLogin.handleBlur("password")}
                  type="password"
                  id="loginPassword"
                  className="form-control active"
                />
                <label className="form-label" htmlFor="loginPassword">
                  {t("Password")}
                </label>
              </div>
              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  fullWidth
                >
                  {t("Login")}
                </Button>
              )}
              {appErr || serverErr ? (
                <Alert
                  variant="outlined"
                  severity="error"
                  sx={{ maxWidth: "350" }}
                >
                  {appErr}
                  {serverErr}
                </Alert>
              ) : null}

              <div className="text-center">
                <p>
                  <DarkModeSwitch />
                  {t("Not_a_member")}?
                  <Link className="text-reset" to="/view-collections">
                    {t("Continue")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
          {/* ------------Register-------------  */}
          <div
            className="tab-pane"
            id="register"
            role="tabpanel"
            aria-labelledby="register-tab"
          >
            <form onSubmit={formik.handleSubmit}>
              <div className="text-center mb-3">
                <p>{t("Sign_up_with")}:</p>
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
                <TextField
                  fullWidth
                  variant="standard"
                  type="text"
                  className="form-control active"
                  onChange={formik.handleChange("name")}
                  value={formik.values.name}
                  onBlur={formik.handleBlur("name")}
                />
                <label className="form-label">{t("Name")}</label>
              </div>

              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  variant="standard"
                  type="email"
                  className="form-control active"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <label className="form-label">Email</label>
              </div>

              <div className="form-outline mb-4">
                <TextField
                  fullWidth
                  variant="standard"
                  type="password"
                  className="form-control active"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <label className="form-label">{t("Password")}</label>
              </div>

              <div className="form-outline mb-4">
                <TextField
                  variant="standard"
                  fullWidth
                  value={formik.values.password2}
                  onChange={formik.handleChange("password2")}
                  onBlur={formik.handleBlur("password2")}
                  type="password"
                  className="form-control active"
                />
                <label className="form-label">
                  {t("Repeat")} {t("Password")}
                </label>
              </div>

              {loading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="outlined"
                  color="inherit"
                  fullWidth
                >
                  {t("Register")}
                </Button>
              )}
              {appErr || serverErr ? (
                <Alert variant="outlined" severity="error">
                  {appErr}
                  {serverErr}
                </Alert>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
