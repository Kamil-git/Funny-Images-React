import * as React from "react"
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import EditIcon from "@mui/icons-material/Edit"
import {
  ButtonGroup,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { updateCollectionAction } from "../../../../../redux/slices/collection/collectionSlice"
import * as Yup from "yup"
import { useFormik } from "formik"
import { fetchUsersCollection } from "../../../../../redux/slices/users/usersSlices"
import { useNavigate } from "react-router-dom"
const formSchema = Yup.object({
  name: Yup.string(),
  tags: Yup.string(),
})

export default function ModalEditCard(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //passed id === props._id._id
  const id = props._id._id
  React.useEffect(() => {
    return () => {
      dispatch(fetchUsersCollection(id))
    }
  }, [dispatch, id])
  const state = useSelector((state) => state?.users)

  const { loading, appErr, serverErr, userCollections, isEdited, isDeleted } =
    state

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userCollections[0]?.name,
      tags: userCollections[0]?.tags,
    },
    onSubmit: (values) => {
      const data = {
        name: values.name,
        tags: values.tags,
        id,
      }
      dispatch(updateCollectionAction(data))
      if (isEdited || isDeleted) {
        navigate("/my-collections")
      }
    },
    validationSchema: formSchema,
  })

  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <ButtonGroup {...bindTrigger(popupState)}>
            <EditIcon />
            Edit
          </ButtonGroup>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
                fullWidth
                variant="standard"
                type="text"
                placeholder="Change Name"
                autoComplete="text"
              />
              <TextField
                value={formik.values.tags}
                onChange={formik.handleChange("tags")}
                onBlur={formik.handleBlur("tags")}
                fullWidth
                variant="standard"
                type="text"
                autoComplete="text"
                placeholder="Add Tags"
              />
              {loading ? (
                <CircularProgress />
              ) : (
                <IconButton type="submit">
                  <AddIcon />
                </IconButton>
              )}
            </form>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
