import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"

import axios from "axios"
import { baseUrl } from "../../../utils/baseURL"

const resetComment = createAction("comment/reset")

export const createCommentAction = createAsyncThunk(
  "comment/created",
  async (comment, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      
    
      const { data } = await axios.post(
        `${baseUrl}/api/comments`,
        {collectionId:comment?.collectionId,
        description:comment?.description,
        userName:comment?.userName
        },
        config
      )
      dispatch(resetComment())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

// export const fetchCommentsAction = createAsyncThunk(
//   "comment/fetch",
//   async (id, { rejectWithValue, getState, dispatch }) => {
//     try {
//         const {data} = await axios.get(`${baseUrl}/api/comments`)
//         return data
//     } catch (error) {
//         if(!error?.response) throw error
//         return rejectWithValue(error?.response?.data)
//     }
//   }
// )

const commentSlice = createSlice({
  name: "comment",
  initialState: {},
  extraReducers: (builder) => {
    //create item
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetComment, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comment = action?.payload
      state.loading = false
      state.isCreated = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createCommentAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
  },
})

export default commentSlice.reducer
