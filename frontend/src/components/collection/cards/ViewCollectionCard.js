import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import CommentIcon from "@mui/icons-material/Comment"
import AddIcon from "@mui/icons-material/Add"
import {TextField} from "@mui/material"
import { Box } from "@mui/system"
import Moment from "react-moment"


const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function ViewCollectionCard(props) {
  const [expanded, setExpanded] = React.useState(false)
  const [comments, setComments] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleCommentsClick = () => {
    setComments(!comments)
  }
  const commentSubmitHandler = (e) =>{
    e.preventDefault()
  }
  const collection = props?.collection
  
  return (
    <Card
      sx={{
        minWidth: 345,
        margin: "2rem",
        backgroundColor: "unset",
        color: "unset",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            
          </IconButton>
        }
        title={`${collection?.name}`}
        subheader={
          <Moment format="D MMM YYYY" withTitle>
            {collection?.createdAt}
          </Moment>
        }
      />
      <CardMedia component="img" height="194" image="" alt="" />
      <CardContent>
        <Typography variant="body2" color="text.secondary"></Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box>
          <ExpandMore
            sx={{ backgroundColor: "unset" }}
            expand={comments}
            onClick={handleCommentsClick}
            aria-expanded={comments}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </Box>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={comments} timeout="auto" unmountOnExit>
        <CardContent>
          <form onSubmit={commentSubmitHandler}>
            <TextField
              sx={{ width: "85%" }}
              id="standard-basic"
              variant="standard"
            ></TextField>
            <IconButton type="submit">
              <AddIcon />
            </IconButton>
          </form>

          {Array.from(Array(3)).map((_, index) => (
            <Typography key={index} sx={{ fontSize: "12px" }} paragraph>
              User: Zajebista
            </Typography>
          ))}
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{collection?.tags}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
