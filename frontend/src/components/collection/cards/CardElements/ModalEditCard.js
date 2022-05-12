import * as React from "react"
import Typography from "@mui/material/Typography"
import AddIcon from "@mui/icons-material/Add"
import Popover from "@mui/material/Popover"
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import EditIcon from "@mui/icons-material/Edit"
import { ButtonGroup, IconButton, TextField } from "@mui/material"
export default function PopoverPopupState() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <ButtonGroup {...bindTrigger(popupState)}>
            <EditIcon />
            Edit
          </ButtonGroup>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <form>
              <TextField
                fullWidth
                variant="standard"
                type="text"
                className="form-control active"
                placeholder="Change Name"
              />
              <TextField
                fullWidth
                variant="standard"
                type="text"
                className="form-control active"
                placeholder="Add Tags"
              />
              <IconButton
              type="submit"

              ><AddIcon/></IconButton>
            </form>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}
