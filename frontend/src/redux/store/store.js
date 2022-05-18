import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlices'
import collectionsReducer from '../slices/collection/collectionSlice'
import item from '../slices/items/itemsSlice'
import comment from "../slices/comments/commentsSlice"
const store = configureStore({
    reducer:{
        users:usersReducer,
        collection:collectionsReducer,
        item,
        comment,
        
    }
})

export default store