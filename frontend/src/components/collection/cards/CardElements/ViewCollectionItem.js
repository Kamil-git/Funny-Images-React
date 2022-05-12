import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"

import Typography from "@mui/material/Typography"

import { CardHeader, IconButton } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"

export default function ViewCollectionItem() {
  return (
    <Card sx={{ maxWidth: 345}}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
      ></CardHeader>
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
    </Card>
  )
}
