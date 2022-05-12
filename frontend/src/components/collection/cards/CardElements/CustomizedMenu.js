import * as React from "react"
import { styled, alpha } from "@mui/material/styles"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

import ArchiveIcon from "@mui/icons-material/Archive"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { ButtonGroup, Modal } from "@mui/material"
import ModalEditCard from "./ModalEditCard"
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 90,

    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,

        marginRight: theme.spacing(1.5),
      },
    },
  },
}))

export default function CustomizedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <ButtonGroup
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "inherit" }}
        disableElevation
        onClick={handleClick}
      >
        <MoreVertIcon />
      </ButtonGroup>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem  disableRipple>
          
          <ModalEditCard/>
          
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <ArchiveIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
