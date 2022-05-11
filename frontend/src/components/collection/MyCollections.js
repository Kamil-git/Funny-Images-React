import React, { useEffect } from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import Grid from "@mui/material/Grid"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersCollection } from "../../redux/slices/users/usersSlices"
import { Alert, CircularProgress } from "@mui/material"
import MyCollectionsCard from "./cards/MyCollectionsCard"

export default function MyCollections() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsersCollection())
  }, [dispatch])
  const users = useSelector((state) => state?.users)

  const { userCollections, loading, appErr, serverErr } = users

  return (
    <div>
      <Navbar />
      {loading ? (
        <CircularProgress />
      ) : appErr || serverErr ? (
        <Alert variant="outlined" severity="error">
          {appErr}
          {serverErr}
        </Alert>
      ) : userCollections?.length <= 0 ? (
        <div className="min-vh-100 text-center">
          <h2>No collection found</h2>
        </div>
      ) : (
        <div className="min-vh-100">
          <Grid
            justifyContent="center"
            alignItems="center"
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {userCollections?.map((_, index) => (
              <MyCollectionsCard
                collection={userCollections[index]}
                key={index}
              ></MyCollectionsCard>
            ))}
          </Grid>
        </div>
      )}
      <Footer />
    </div>
  )
}
