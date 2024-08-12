import React from 'react'
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  Icon,
  ListItemIcon,
} from '@mui/material'
import { Box, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { container } from '../../app/diContainer'
import { DiaryAppServiceI } from './API/diaryAppServiceI'
const App: React.FC = () => {
  const diaryAppService = container.resolve<DiaryAppServiceI>('diaryAppService')
  const sendHello = async () => {
    const result = await diaryAppService.sendHello('World')
    console.log(result)
  }
  const init = async () => {
    await diaryAppService.init()
    console.log('init is done')
  }
  const getAllDiarySummary = async () => {
    const result = await diaryAppService.getAllDiarySummary()
    console.log(result)
  }

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box display='flex' position='relative'>
      <CssBaseline />
      <DrawerMenu drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <EditorArea drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <Button onClick={sendHello}>Hello</Button>
      <Button onClick={init}>Init</Button>
      <Button onClick={getAllDiarySummary}>Get All Diary Summary</Button>
    </Box>
  )
}

export default App

const ApplicationBar = () => {
  return (
    <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant='h6' noWrap component='div'>
          Clipped drawer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

interface DrawerMenuProps {
  drawerOpen: boolean
  toggleDrawer: () => void
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({
  drawerOpen,
  toggleDrawer,
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
        {['記事1', '記事2', '記事3'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} secondary={`2024-05-${index + 1}`} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

interface EditorAreaProps {
  drawerOpen: boolean
  toggleDrawer: () => void
}
const EditorArea: React.FC<EditorAreaProps> = ({
  drawerOpen,
  toggleDrawer,
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
        multiline
        fullWidth
        rows={10}
        variant='outlined'
        placeholder='ここに日記を書きます'
      />
    </Box>
  )
}
