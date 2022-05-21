import { Autocomplete, Container, FormControl, TextField } from "@mui/material"
import { useFormik } from "formik"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

function SearchBar({ data }) {
  const { t } = useTranslation()
if(Array.isArray(data)){
return (
  <form>
    <Autocomplete
      size="small"
      sx={{ minWidth: "5rem" }}
      freeSolo
      disableClearable
      options={data?.map((option) => option.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
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
  

}

export default SearchBar
