import React from "react"
import Footer from "../Navs/Footer"
import Navbar from "../Navs/Navbar"
import { Button, Input, TextField } from "@mui/material"
function CreateCollection() {
  return (
    <div>
      <Navbar />

      <form className="p-4 d-flex justify-content-center w-100 min-vh-100">
        <div className="file-upload-wrapper">
          <TextField
            color="primary"
            variant="standard"
            fullWidth
            placeholder="Collection Name"
          />
          <TextField
            color="primary"
            variant="standard"
            fullWidth
            placeholder="Tags"
          />
          <div class="mb-3">
            
            <input
              class="form-control form-control-sm"
              id="formFileSm"
              type="file"
            />
            <Button variant="outlined" color="success" fullWidth>
              Create
            </Button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default CreateCollection
