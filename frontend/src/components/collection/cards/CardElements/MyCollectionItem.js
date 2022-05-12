import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { CardHeader, IconButton } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

export default function MyCollectionItem() {
    
  return (
    <Card sx={{ maxWidth: 345, m:1 }}>
     
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Collection Item titlte
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Collection Item Description
        </Typography>
      </CardContent>
        
      <CardActions>
        <Button size="small">
          <FavoriteIcon />
        </Button>
        <Button size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  )
}
