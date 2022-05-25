import React from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import { Button, CircularProgress, TextField } from "@mui/material"
import { createCollectionAction } from "../../redux/slices/collection/collectionSlice"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Dropzone from "react-dropzone"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useNavigate } from "react-router-dom"
const formSchema = Yup.object({
  name: Yup.string().required("Collection name required"),
  tags: Yup.string().required("Tags are required"),
  imageLink: Yup.string().required("Image is required"),
})

function CreateCollection() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      name: "",
      tags: "",
      imageLink: "",
    },
    onSubmit: (values) => {
      const data = {
        name: values?.name,
        tags: values?.tags,
        imageLink: values?.imageLink,
      }

      dispatch(createCollectionAction(data))
    },
    validationSchema: formSchema,
  })
  const user = useSelector((state)=> state?.users)
  const coll = useSelector((state) => state?.collection)
const {userAuth} = user
  const { loading, appErr, serverErr } = coll
  React.useEffect(() => {
    if(!userAuth){
      navigate("/")
    }
    
  }, [navigate, userAuth])
  
  return (
    <div>
      <Navbar />

      <form
        onSubmit={formik.handleSubmit}
        style={{minHeight:"100vh", alignItems:"center"}}
        className="p-4 d-flex justify-content-center w-100"
      >
        <div className="file-upload-wrapper">
          <TextField
            onChange={formik.handleChange("name")}
            value={formik.values.name}
            onBlur={formik.handleBlur("name")}
            color="primary"
            variant="standard"
            fullWidth
            placeholder={t("Collection_name")}
          />

          <TextField
            onChange={formik.handleChange("tags")}
            value={formik.values.tags}
            onBlur={formik.handleBlur("tags")}
            color="primary"
            variant="standard"
            fullWidth
            placeholder={t("Tags")}
          />

          <Dropzone
            onBlur={formik.handleBlur("imageLink")}
            onDrop={(acceptedFiles) => {
              formik.setFieldValue("imageLink", acceptedFiles[0])
            }}
          >
            {({ getRootProps, getInputProps, acceptedFiles }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <CloudUploadIcon sx={{ m: 0.5 }} />
                  {acceptedFiles.map((file) => (
                    <li style={{ listStyle: "none" }} key={file.path}>
                      {file.path}
                    </li>
                  ))}
                </div>
              </section>
            )}
          </Dropzone>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="outlined" color="inherit" fullWidth>
              {t("Create")}
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
