import { Autocomplete, TextField } from "@mui/material"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

function SearchBar({ data }) {
  const { t } = useTranslation()
  const [s,se] = useState("")
  
  const handleSubmit =(e) =>{
    e.preventDefault()
    console.log(s)
  }
  return (

    <form onSubmit={handleSubmit}>
      <Autocomplete
        sx={{ minWidth: "8rem" }}
        size="small"
        freeSolo
        value={s}
        onChange={(e) => se(e.target.value)}
        disableClearable
        options={data?.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            fullWidth
            placeholder={t("Search")}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
    </form>
  )
}

export default SearchBar
