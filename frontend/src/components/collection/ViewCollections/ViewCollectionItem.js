import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Typography from "@mui/material/Typography"

import { CardActions, CardHeader, IconButton } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useSelector } from "react-redux"

export default function ViewCollectionItem(props) {
  const item = props.items
  const user = useSelector(state => state?.users)
  const {userAuth} = user
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={`${item.itemImg}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
        <CardActions>
        {userAuth? (<IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>) : (null)}
          
        </CardActions>
      </CardContent>
    </Card>
  )
}
