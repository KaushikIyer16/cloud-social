import React from 'react'
import { AppBar, Typography, Box } from '@mui/material'

export default function Navigator(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, padding: 2 }}
        >
          Welcome to Cloud Social
        </Typography>
      </AppBar>
    </Box>
  )
}
