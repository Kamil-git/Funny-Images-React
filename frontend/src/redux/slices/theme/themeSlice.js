import { createSlice } from "@reduxjs/toolkit"








const localStorageTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: localStorageTheme,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme
    },
  },
})

export const { toggleTheme } = themeSlice.actions

export default themeSlice.reducer
