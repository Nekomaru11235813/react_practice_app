import React from 'react'
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Button,
  IconButton,
} from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Summary } from '../../../../types/diaryApp'

export interface DrawerMenuProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  summaryList: Summary[]
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  drawerOpen,
  toggleDrawer,
  summaryList,
}) => {
  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={drawerOpen}
      sx={{
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          boxSizing: 'border-box',
          marginTop: theme => theme.spacing(8),
          width: theme => theme.spacing(16),
        },
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
      <Button fullWidth variant='contained' color='primary'>
        新規作成
      </Button>
      <List>
        {summaryList.map((summary, index) => (
          <ListItemButton key={summary.id.value}>
            <ListItemText
              primary={summary.title}
              secondary={summary.createdAt.toDateString()}
            />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}
