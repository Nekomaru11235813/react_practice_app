import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import { DiaryDTO } from '../../../../types/diaryApp'

export interface EditorAreaProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  nowEditingDiary: DiaryDTO
}
export const EditorArea: React.FC<EditorAreaProps> = ({
  drawerOpen,
  toggleDrawer,
  nowEditingDiary,
}) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        transition: 'margin 0.25s',
        marginLeft: drawerOpen ? theme => theme.spacing(16) : 0,
      }}
    >
      <Box>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Box>
      <TextField
        id='title'
        fullWidth
        variant='outlined'
        placeholder='タイトル'
        value={nowEditingDiary.title}
      ></TextField>
      <TextField
        id='content'
        multiline
        fullWidth
        rows={10}
        variant='outlined'
        placeholder='ここに日記を書きます'
        value={nowEditingDiary.content}
      />
    </Box>
  )
}
