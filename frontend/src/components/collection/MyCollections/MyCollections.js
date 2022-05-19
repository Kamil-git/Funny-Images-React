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
  const itemState = useSelector((state)=> state?.item)
  const commentState = useSelector((state)=> state.comment)

  useEffect(() => {
    dispatch(fetchUsersCollection())
    
    if (!userAuth || userAuth.isBlocked=== true) return navigate("/")
     
    
  }, [isDeleted, isEdited, itemState.isDeleted, itemState.isCreated,itemState.likes,userAuth,navigate,dispatch,commentState.isCreated])
  return (
    <div>
      <Navbar />
      <Grid container sx={{ minHeight: "100vh" }}>
        {loading ? (
          <CircularProgress sx={{ maxHeight: "200px" }} />
        ) : appErr || serverErr ? (
          <Alert
            variant="outlined"
            severity="error"
            sx={{ maxHeight: "200px", width: "400px" }}
          >
            {appErr}
            {serverErr}
          </Alert>
        ) : userCollections?.length <= 0 ? (
          <h2>{t("No_collection_found")}</h2>
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
