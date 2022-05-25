import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import {
  loginUserAction,
  registerUserAction,
} from "../redux/slices/users/usersSlices"

import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material"
import { useTranslation } from "react-i18next"
import GitHubIcon from "@mui/icons-material/GitHub"
import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import GoogleIcon from "@mui/icons-material/Google"
import { ToggleSwitch } from "../components/Navs/ToggleSwitch"
import Rules from "./Rules"
import SwitchLanguage from "../components/Navs/SwitchLanguage"
import { Box } from "@mui/system"

//register schema
const formSchema = Yup.object({
  name: Yup.string().required("Name is required"),
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
  const { t } = useTranslation()
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
    if (registered) {
      window.location.reload()
    }
    return () => {}
  }, [navigate, userAuth, registered])

  return (
    <Grid
      id="mainsection"
      className="w-100 p-4 d-flex justify-content-center pb-4"
      sx={{ minHeight: "100vh" }}
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
                <Link to="#">
                  <FacebookIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="#">
                  <GoogleIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="#">
                  <TwitterIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="#">
                  <GitHubIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.email}
                </span>
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.password}
                </span>
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
                  
              
                  severity="error"
                  sx={{ maxWidth: "350" }}
                >
                 {appErr}...{serverErr}
                </Alert>
              ) : null}

              <div className="text-center">
                <Box
                  sx={{
                    display: "flex",
                    flex: "row no-wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ToggleSwitch />
                  <SwitchLanguage />
                  <Box>{t("Not_a_member")}?</Box>
                  <Link
                    className="text-reset"
                    style={{ textDecorationLine: "underline" }}
                    to="/view-collections"
                  >
                    {t("Continue")}
                  </Link>
                </Box>
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
              <div className="text-center mb-4">
                <p>{t("Sign_up_with")}:</p>
                <Link to="">
                  <FacebookIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="">
                  <GoogleIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="">
                  <TwitterIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>

                <Link to="">
                  <GitHubIcon
                    fontSize="large"
                    sx={{ color: "text.secondary", m: 0.5 }}
                  />
                </Link>
              </div>

              <p className="text-center">or:</p>

              <div className="form-outline mb-3 text-center">
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.name}
                </span>
              </div>

              <div className="form-outline mb-3 text-center">
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.email}
                </span>
              </div>

              <div className="form-outline mb-3 text-center">
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.password}
                </span>
              </div>

              <div className="form-outline mb-3 text-center">
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
                <span style={{ fontSize: "10px", color: "red" }}>
                  {formik.errors.password2}
                </span>
              </div>

              {loading ? (
                <CircularProgress />
              ) : (
                <Rules handleSubmit={formik.handleSubmit} />
              )}
              {appErr || serverErr ? (
                <Alert  severity="error">
                  {appErr}...{serverErr}
                </Alert>
              ) : null}
              <Box className="text-center">
                <Box
                  style={{
                    display: "flex",
                    flex: "row no-wrap",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ToggleSwitch />
                  <SwitchLanguage />
                  <Box>{t("Not_a_member")}?</Box>

                  <Link
                    className="text-reset"
                    style={{
                      textDecorationLine: "underline",
                      display: "block",
                    }}
                    to="/view-collections"
                  >
                    {t("Continue")}
                  </Link>
                </Box>
              </Box>
            </form>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export default Main
