import React, { useEffect } from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { fetchCollectionAction } from "../../redux/slices/collection/collectionSlice"
import { useDispatch, useSelector } from "react-redux"
import { Alert, CircularProgress,} from "@mui/material"
import ViewCollectionCard from "./cards/ViewCollectionCard"

import { useNavigate } from "react-router-dom"

export default function ViewCollection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state?.users)
  const { userAuth } = user
  useEffect(() => {
    dispatch(fetchCollectionAction())
  }, [dispatch, navigate])

  const collection = useSelector((state) => state?.collection)
  const { collectionList, loading, appErr, serverErr } = collection

  return (
    <div>
      <Navbar />
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : appErr || serverErr ? (
        <div className="min-vh-100">
          <Alert variant="outlined" severity="error">
            {appErr}
            {serverErr}
          </Alert>
        </div>
      ) : !collectionList ? (
        <div className="min-vh-100 text-center">
          <h2>No collection found</h2>
        </div>
      ) : (
        <div className="min-vh-100">
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
        </div>
      )}
      <Footer />
    </div>
  )
}
