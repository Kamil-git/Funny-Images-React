import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import FavoriteIcon from "@mui/icons-material/Favorite"

import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {deleteItemAction} from "../../../redux/slices/items/itemsSlice"


export default function MyCollectionItem(props) {
  const dispatch = useDispatch()
    const { t } = useTranslation()
   
    return (
      <Card sx={{ maxWidth: 345, m: 1 }}>
        <CardMedia
          component="img"
          alt=""
          height="200"
          image={`${props.items.itemImg}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.items.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.items.description}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small">
            <FavoriteIcon />
          </Button>
          
          <Button onClick={()=> dispatch(deleteItemAction(props.items._id))} size="small">{t("Delete")}</Button>
        </CardActions>
      </Card>
    )
}
