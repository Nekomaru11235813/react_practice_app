import { DeleteOutline, Send, SendOutlined } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
} from '@mui/material'
import React from 'react'
import LikeButton from '../SurvivalTypeScript/LikeButton'

const InputField: React.FC = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      component='form'
    >
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Avatar> H </Avatar>
            <TextField id='title' label='タイトル' variant='standard' />
            <Button variant='outlined' startIcon={<SendOutlined />}>
              送信
            </Button>
            <Button
              color='secondary'
              variant='outlined'
              startIcon={<DeleteOutline />}
            >
              削除
            </Button>
            <LikeButton />
            <TextField type='date' id='date' variant='outlined' />
          </Box>
          <TextField id='content' label='内容' variant='outlined' />
        </CardContent>
      </Card>
      <Card>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Avatar> H </Avatar>
            <TextField id='title' label='タイトル' variant='standard' />
            <Button variant='outlined' startIcon={<SendOutlined />}>
              送信
            </Button>
            <Button
              color='secondary'
              variant='outlined'
              startIcon={<DeleteOutline />}
            >
              削除
            </Button>
            <LikeButton />
            <TextField type='date' id='date' />
          </Box>
          <TextField id='content' label='内容' variant='outlined' />
        </CardContent>
      </Card>
    </Box>
  )
}

export default InputField
