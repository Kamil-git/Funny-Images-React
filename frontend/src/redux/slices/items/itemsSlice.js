import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit"
import axios from "axios"
import { baseUrl } from "../../../utils/baseURL"

//Create Item action

//action to redirect
const resetItem = createAction("category/reset")
const resetItemEdit = createAction("item/reset")
const resetItemDelete = createAction("item/delete")

//Create
export const createItemAction = createAsyncThunk(
  "item/created",
  async (item, { rejectWithValue, getState, dispatch }) => {
    
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      
      //http call
      const formData = new FormData()
      formData.append("title", item?.title)
      formData.append("description", item?.description)
      formData.append("collectionId", item?.collectionId)
      formData.append("itemImg", item?.itemImg)
      
      const { data } = await axios.post(
        `${baseUrl}/api/items`,
        formData,
        config
      )
     
      dispatch(resetItem())
      
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//Update
export const updateItemAction = createAsyncThunk(
  "item/updated",
  async (item, { rejectWithValue, getState, dispatch }) => {
    
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      //http call
      const { data } = await axios.put(
        `${baseUrl}/api/items/${item?.id}`,
        item,
        config
      )
      //dispatch
      dispatch(resetItemEdit())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//Delete
export const deleteItemAction = createAsyncThunk(
  "item/delete",
  async (itemId, { rejectWithValue, getState, dispatch }) => {
    //get user token
    const user = getState()?.users
    const { userAuth } = user
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    }
    try {
      //http call
      const { data } = await axios.delete(
        `${baseUrl}/api/items/${itemId}`,
        config
      )
      //dispatch
      dispatch(resetItemDelete())
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)

//fetch all items
export const fetchItemsAction = createAsyncThunk(
  "item/list",
  async (collectionId, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/items?collection=${collectionId}`
      )
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)
//fetch item details
export const fetchItemDetailsAction = createAsyncThunk(
  "item/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/items/${id}`)
      return data
    } catch (error) {
      if (!error?.response) throw error
      return rejectWithValue(error?.response?.data)
    }
  }
)


//slice
const itemSlice = createSlice({
  name: "item",
  initialState: {},
  extraReducers: (builder) => {
    //create item
    builder.addCase(createItemAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetItem, (state, action) => {
      state.isCreated = true
    })
    builder.addCase(createItemAction.fulfilled, (state, action) => {
      state.itemCreated = action?.payload
      state.loading = false
      state.isCreated = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(createItemAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //Update item
    builder.addCase(updateItemAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetItemEdit, (state, action) => {
      state.isUpdated = true
    })
    builder.addCase(updateItemAction.fulfilled, (state, action) => {
      state.itemUpdated = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
      state.isUpdated = false
    })
    builder.addCase(updateItemAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //Delete item
    builder.addCase(deleteItemAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(resetItemDelete, (state, action) => {
      state.isDeleted = true
    })
    builder.addCase(deleteItemAction.fulfilled, (state, action) => {
      state.itemUpdated = action?.payload
      state.isDeleted = false
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(deleteItemAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //fetch items
    builder.addCase(fetchItemsAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchItemsAction.fulfilled, (state, action) => {
      state.itemLists = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchItemsAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })

    //fetch item Details
    builder.addCase(fetchItemDetailsAction.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchItemDetailsAction.fulfilled, (state, action) => {
      state.itemDetails = action?.payload
      state.loading = false
      state.appErr = undefined
      state.serverErr = undefined
    })
    builder.addCase(fetchItemDetailsAction.rejected, (state, action) => {
      state.loading = false
      state.appErr = action?.payload?.message
      state.serverErr = action?.error?.message
    })
 
  },
})

export default itemSlice.reducer
