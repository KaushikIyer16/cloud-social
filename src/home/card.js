import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardMedia,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function PostCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={props.title} subheader={props.subheader} />
      {props.simple ? (
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ wordWrap: 'break-word' }}
          >
            {props.content}
          </Typography>
        </CardContent>
      ) : (
        <CardMedia
          component="img"
          height="200"
          sx={{
            maxWidth: 250,
            marginLeft: '50%',
            transform: 'translateX(-50%)',
          }}
          image={props.content}
          alt="green iguana"
        />
      )}
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          color="secondary"
          onClick={() => props.iconClickHandler(props.postKey)}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography color="text.secondary">{props?.likes ?? 0}</Typography>
      </CardActions>
    </Card>
  )
}
