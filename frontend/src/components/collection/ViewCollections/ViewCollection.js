import React, { useEffect } from "react"
import Footer from "../../Navs/Footer"
import Navbar from "../../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { fetchCollectionAction } from "../../../redux/slices/collection/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import { Alert, CircularProgress } from "@mui/material"
import ViewCollectionCard from "./ViewCollectionCard"

import { useTranslation } from "react-i18next"

export default function ViewCollection() {
  const dispatch = useDispatch()

  const { t } = useTranslation()
 


  const collection = useSelector((state) => state?.collection)

  const { collectionList, loading, appErr, serverErr } = collection
  const commentState = useSelector((state) => state.comment)
  useEffect(() => {
    dispatch(fetchCollectionAction())
  }, [dispatch, commentState.isCreated])
  return (
    <div>
      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        {loading ? (
          <CircularProgress />
        ) : appErr || serverErr ? (
          <Alert variant="outlined" severity="error">
            {appErr}
            {serverErr}
          </Alert>
        ) : collectionList?.length <= 0 ? (
          <h2>{t("No_collection_found")}</h2>
        ) : (
          <Grid
            justifyContent="center"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {collectionList?.map((_, index) => (
              <div key={index}>
                <ViewCollectionCard
                  collection={collectionList[index]}
                ></ViewCollectionCard>
              </div>
            ))}
          </Grid>
        )}
      </Grid>
      <Footer />
    </div>
  )
}
