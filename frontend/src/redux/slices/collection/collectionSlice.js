import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../../utils/baseURL"
//create
export const createCollectionAction = createAsyncThunk(
  "collection/create",
  async (collection, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/collection`,
        {
          name: collection?.name,
        },
        config
      )
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response.data)
    }
  }
)

//fetch all
export const fetchCollectionAction = createAsyncThunk(
  "collection/fetch",
  async (collection, { rejectWithValue, getState, dispatch }) => {
   
    
    //http call
    try {
      const { data } = await axios.get(`${baseUrl}/api/collection`)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
//Update
export const updateCollectionAction = createAsyncThunk(
  "collection/update",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    try {
      const { data } = await axios.put(`${baseUrl}/api/collection${id}`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)
export const deleteCollectionAction = createAsyncThunk(
  "collection/delete",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    //http call
    try {
      const { data } = await axios.put(`${baseUrl}/api/collection${id}`, config)
      return data
    } catch (error) {
      if (!error?.response) {
        throw error
      }
      return rejectWithValue(error?.response?.data)
    }
  }
)

//-------------------------------slices
const collectionSlices = createSlice({
  name: "collection",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(createCollectionAction.fulfilled, (state, action) => {
      state.collection = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action.payload.message
      state.serverErr = action.error.message
    })
    //fetch
    builder.addCase(fetchCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCollectionAction.fulfilled, (state, action) => {
      state.collectionList = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //update
    builder.addCase(updateCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(updateCollectionAction.fulfilled, (state, action) => {
      state.updateCollection = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(updateCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    //delete
    builder.addCase(deleteCollectionAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(deleteCollectionAction.fulfilled, (state, action) => {
      state.deletedCollection = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteCollectionAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
    
  },
})

export default collectionSlices.reducer
