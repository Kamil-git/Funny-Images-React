import { Autocomplete, TextField } from "@mui/material"
import React from "react"
import { useTranslation } from "react-i18next"

function SearchBar({ data }) {
  const { t } = useTranslation()
  console.log(data)
  
  return (
    <form>
      <Autocomplete
        sx={{ minWidth: "8rem" }}
        size="small"
        freeSolo
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
