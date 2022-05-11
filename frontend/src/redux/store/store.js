import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlices'
import collectionsReducer from '../slices/collection/collectionSlice'
const store = configureStore({
    reducer:{
        users:usersReducer,
        collection:collectionsReducer
    }
})

export default store