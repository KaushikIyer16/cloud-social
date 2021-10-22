import React, { Fragment, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Divider,
  Typography
} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from './ducks'

export default function CreatePostModal(props) {
  const userName = useSelector((state) => state.posts.userName)
  const dispatch = useDispatch()
  return (
    <Dialog open={props.open} onClose={props.onClose}>
      {userName === '' ? (
        <UserNameForm dispatch={dispatch} />
      ) : (
        <AddPostForm
          userName={userName}
          onClose={props.onClose}
          dispatch={dispatch}
        />
      )}
    </Dialog>
  )
}

function AddPostForm(props) {
  const [post, setPost] = useState({ title: '', content: '', type: 'SIMPLE' })
  const [image, setImage] = useState(null)
  return (
    <Fragment>
      <DialogTitle>Add a new Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          What do you to post now {props.userName}. Write up some amazing content or upload an image with a title
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="title"
          type="text"
          fullWidth
          variant="outlined"
          value={post.title}
          required
          onChange={(event) =>
            setPost((val) => ({
              ...val,
              title: event.target.value,
            }))
          }
        />
        <Divider sx={{padding: 2, color: "#000", borderBottom: "1px solid #FFA726"}} variant="middle"/>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="content"
          type="content"
          fullWidth
          variant="outlined"
          multiline
          value={post.content}
          onChange={(event) =>
            setPost((val) => ({
              ...val,
              content: event.target.value,
            }))
          }
        />
        <p>or</p>
        <Button variant="contained" component="label">
          <Typography sx={{color: "#fff"}}>Upload File</Typography>
          <input
            type="file"
            hidden
            onChange={(event) => {
              setImage(event.target.files[0]);
              console.log(event.target.files[0])
              // readFile(event.target.files[0], setImage)
              setPost((post) => ({
                ...post,
                type: 'IMAGE',
              }))
            }}
          />
        </Button>
        <p>{image && image.name}</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => {
            if (post.type === 'SIMPLE') {
              props.dispatch(
                actions.addPost({
                  ...post,
                  username: props.userName,
                  likes: 0,
                })
              )
            } else {
              props.dispatch(
                actions.uploadImage(image, post.title, props.userName)
              )
            }
            props.onClose()
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Fragment>
  )
}

function UserNameForm(props) {
  const [userName, setUserName] = useState('')

  return (
    <Fragment>
      <DialogTitle>Enter a Username</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let us know who you are before you post the next LIT thing!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Username"
          type="text"
          fullWidth
          variant="standard"
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(event) => {
            props.dispatch(actions.addUserNames(userName))
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Fragment>
  )
}
