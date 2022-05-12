import React from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import { Button, CircularProgress, TextField } from "@mui/material"
import { createCollectionAction } from "../../redux/slices/collection/collectionSlice"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"

const formSchema = Yup.object({
  name: Yup.string().required("Collection name required"),
  tags: Yup.string(),
  imageLink: Yup.string(),
})




function CreateCollection() {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: "",
      tags:"",
      imageLink:""
    },
    onSubmit: (values) => {
      dispatch(createCollectionAction(values))
    },
    validationSchema: formSchema,
  })

  const state = useSelector((state) => state?.collection)

  const { loading, appErr, serverErr} = state

  return (
    <div>
      <Navbar />

      <form
        onSubmit={formik.handleSubmit}
        className="p-4 d-flex justify-content-center w-100 min-vh-100"
      >
        <div className="file-upload-wrapper">
          <TextField
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            onBlur={formik.handleBlur("name")}
            color="primary"
            variant="standard"
            fullWidth
            placeholder="Collection Name"
          />

          <TextField
            onChange={formik.handleChange("tags")}
            value={formik.values.tags}
            onBlur={formik.handleBlur("tags")}
            color="primary"
            variant="standard"
            fullWidth
            placeholder="Tags"
          />

          <input
            className="form-control form-control-sm"
            id="formFileSm"
            type="file"
            placeholder="Image"
          />
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="outlined" color="inherit" fullWidth>
              Create
            </Button>
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
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default CreateCollection
