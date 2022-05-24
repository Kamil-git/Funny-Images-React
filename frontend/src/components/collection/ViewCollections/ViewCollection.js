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

  const itemState = useSelector((state) => state?.item)
  const { likes } = itemState

  const collection = useSelector((state) => state?.collection)

  const { collectionList, loading, appErr, serverErr, foundCollections } =
    collection
  const commentState = useSelector((state) => state.comment)
  useEffect(() => {
    dispatch(fetchCollectionAction())
  }, [dispatch, commentState.isCreated, likes,foundCollections])
  
  return (
    <div>
      <Navbar />
      <Grid container sx={{ minHeight: "100vh", justifyContent: "center" }}>
        {loading ? (
          <div>
            <CircularProgress sx={{ alignSelf: "center" }} />
          </div>
        ) : appErr || serverErr ? (
          <div>
            <Alert
              
              severity="error"
              sx={{ maxHeight: "200px", width: "400px" }}
            >
              {appErr}
              {serverErr}
            </Alert>
          </div>
        ) : serverErr || appErr || !Array.isArray(collectionList) ? (
          <Alert
            
            severity="error"
            sx={{ maxHeight: "200px", width: "400px" }}
          >
            {t("No_collection_found")}
          </Alert>
        ) :(
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
