import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Container, Grid, Fab, ThemeProvider } from '@mui/material'
import { actions } from './ducks'
import Card from './card'
import CreatePostModal from './create-post-modal'
import AddIcon from '@mui/icons-material/Add'
import { theme } from "common/util"

export default function Home(props) {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.all)
  const userName = useSelector((state) => state.posts.userName)
  const [modalOpen, setModalOpen] = useState(false)
  const { getAllPosts } = actions
  const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getAllPosts())
  }, [dispatch, getAllPosts])
  return (
    <Fragment>
        <ThemeProvider theme={theme}>
      <Container>
        <Grid container spacing={4} sx={{ padding: 2 }}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              component="div"
              gutterBottom
              sx={{ textAlign: 'center' }}
            >
              👋 Hi {userName}! Let's see some LIT Posts
            </Typography>
          </Grid>
          {posts &&
            Object.entries(posts).map(([key, post]) => (
              <Grid item xs={6} key={post.key}>
                <Card
                  iconClickHandler={(postKey) =>
                    dispatch(actions.incrementLike(postKey))
                  }
                  postKey={post.key}
                  title={post.title}
                  subheader={post.username}
                  content={post.content}
                  likes={post.likes}
                  simple={post.type && post.type === 'SIMPLE'}
                />
              </Grid>
            ))}
        </Grid>
        <Fab
          sx={fabStyle}
          aria-label="Add Posts"
          color="secondary"
          onClick={() => setModalOpen(true)}
        >
          <AddIcon sx={{color: "#fff"}}/>
        </Fab>
        <CreatePostModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </Container>
      </ThemeProvider>
    </Fragment>
  )
}
