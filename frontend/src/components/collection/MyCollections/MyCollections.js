import React, { useEffect } from "react"
import Footer from "../../Navs/Footer"
import Navbar from "../../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersCollection } from "../../../redux/slices/users/usersSlices"
import { Alert, CircularProgress } from "@mui/material"
import MyCollectionsCard from "./MyCollectionsCard"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function MyCollections() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const users = useSelector((state) => state?.users)

  const { userCollections, loading, appErr, serverErr, userAuth } = users
  const stateCollection = useSelector((state) => state?.collection)
  const { isEdited, isDeleted } = stateCollection
  const itemState = useSelector((state) => state?.item)
  const commentState = useSelector((state) => state.comment)

  useEffect(() => {
    dispatch(fetchUsersCollection())

    if (!userAuth || userAuth.isBlocked === true) return navigate("/")
  }, [
    isDeleted,
    isEdited,
    itemState.isDeleted,
    itemState.isCreated,
    itemState.likes,
    userAuth,
    navigate,
    dispatch,
    commentState.isCreated,
    commentState.isDeleted
  ])
  return (
    <div>
      <Navbar />
      <Grid
        container
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div>
            <CircularProgress sx={{ maxHeight: "200px" }} disableShrink />
          </div>
        ) : appErr || serverErr ? (
          <div>
            <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
              {appErr}
              {serverErr}
            </Alert>
          </div>
        ) : serverErr || appErr || !Array.isArray(userCollections) ? (
          <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
            {t("No_collection_found")}
          </Alert>
        ) : userCollections?.length <= 0 ? (
          <Alert severity="error" sx={{ maxHeight: "200px", width: "400px" }}>
            {t("No_collection_found")}
          </Alert>
        ) : (
          <Grid
            justifyContent="center"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {userCollections?.map((_, index) => (
              <div key={index}>
                <MyCollectionsCard
                  collection={userCollections[index]}
                ></MyCollectionsCard>
              </div>
            ))}
          </Grid>
        )}
      </Grid>
      <Footer />
    </div>
  )
}
