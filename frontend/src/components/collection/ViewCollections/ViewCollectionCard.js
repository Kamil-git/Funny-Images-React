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
import { TextField } from "@mui/material"
import { Box } from "@mui/system"
import Moment from "react-moment"
import CollectionsIcon from "@mui/icons-material/Collections"
import { useDispatch, useSelector } from "react-redux"
import ViewCollectionItem from "./ViewCollectionItem"

import { useFormik } from "formik"
import { createCommentAction } from "../../../redux/slices/comments/commentsSlice"
import * as Yup from "yup"
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

const formSchema = Yup.object({
  description: Yup.string().required(),
})
export default function ViewCollectionCard(props) {
  const [expanded, setExpanded] = React.useState(false)
  const [comments, setComments] = React.useState(false)
  const [collectionItems, setCollectionItems] = React.useState(false)
  const dispatch = useDispatch()
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }
  const handleCommentsClick = () => {
    setComments(!comments)
  }
  const handleCollectionItemsClick = () => {
    setCollectionItems(!collectionItems)
  }

  const user = useSelector((state) => state.users)
  const { userAuth } = user

    const formik = useFormik({
      initialValues: {
        description: "",
        userName: "",
        collectionId: props?.collection?._id,
      },
      onSubmit: (values) => {
        const data = {
          description: values?.description,
          userName: userAuth?.name,
          collectionId: props?.collection?._id,
        }

        dispatch(createCommentAction(data))
      },
      validationSchema: formSchema,
    })
  

  return (
    <Card
      sx={{
        minWidth: 345,
        maxHeight: "min-content",
        margin: "2rem",
        backgroundColor: "unset",
        color: "unset",
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            {props.collection.user.name.trim(0, 1)}
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={`${props.collection?.name}`}
        subheader={
          <Moment format="D MMM YYYY" withTitle>
            {props.collection?.createdAt}
          </Moment>
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={`${props?.collection.imageLink}`}
        alt=""
      />
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
          >
            <CommentIcon />
          </ExpandMore>
        </Box>
        <ExpandMore
          sx={{ backgroundColor: "unset" }}
          expand={collectionItems}
          onClick={handleCollectionItemsClick}
          aria-expanded={collectionItems}
        >
          <CollectionsIcon />
        </ExpandMore>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {props?.collection?.comments.map((comment, index) => (
        <Typography key={index} sx={{ fontSize: "12px" }} paragraph>
          {comment.user}:{comment.description}
        </Typography>
      ))}

      <Collapse in={collectionItems} timeout="auto" unmountOnExit>
        {props?.collection.items.map((_, index) => (
          <div key={index}>
            <ViewCollectionItem
              items={props.collection.items[index]}
            ></ViewCollectionItem>
          </div>
        ))}
      </Collapse>
      <Collapse in={comments} timeout="auto" unmountOnExit>
        <CardContent>
          {userAuth ? (
            <form onSubmit={formik.handleSubmit}>
              <TextField
                value={formik.values.description}
                onChange={formik.handleChange("description")}
                onBlur={formik.handleBlur("description")}
                sx={{ width: "85%" }}
                variant="standard"
              ></TextField>
              <IconButton type="submit">
                <AddIcon />
              </IconButton>
            </form>
          ) : null}
        </CardContent>
      </Collapse>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.collection?.tags}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}
