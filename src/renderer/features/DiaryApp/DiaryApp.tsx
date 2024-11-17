import React, { useEffect, useState } from 'react'
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
  ListItemButton,
} from '@mui/material'
import { Box, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { container } from '../../app/diContainer'
import { DiaryAppServiceI } from './API/diaryAppServiceI'
import { DiaryDTO } from '../../../types/diaryApp'
import { Summary } from '../../../types/diaryApp'
import { DrawerMenu } from './components/DrawerMenu'
import { EditorArea } from './components/EditorArea'
const App: React.FC = () => {
  const diaryAppService = container.resolve<DiaryAppServiceI>('diaryAppService')
  const [summaryList, setSummaryList] = useState<Summary[]>([])
  const [nowEditingDiary, setNowEditingDiary] = useState<DiaryDTO>({
    id: undefined,
    title: '',
    content: '',
    createdAt: undefined,
    updatedAt: undefined,
  })
  // 初期描画時にサマリーリスト、初期編集を取得
  useEffect(() => {
    const fetchData = async () => {
      await diaryAppService.init()
      const summaryList = await diaryAppService.getAllDiarySummary()
      setSummaryList(summaryList)
      if (summaryList.length > 0) {
        const diary = await diaryAppService.getDiary(summaryList[0].id.value)
        if (diary != undefined) {
          setNowEditingDiary(diary)
        } else {
          console.error('The first diary is undefined')
        }
      }
    }
    fetchData()
    return () => {
      console.log('cleanup')
    }
  }, [])

  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(true)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box display='flex' position='relative'>
      <CssBaseline />
      <DrawerMenu
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        summaryList={summaryList}
        nowEditingDiary={nowEditingDiary}
        setNowEditingDiary={setNowEditingDiary}
        setSummaryList={setSummaryList}
      />
      <EditorArea
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        nowEditingDiary={nowEditingDiary}
        setNowEditingDiary={setNowEditingDiary}
        setSummaryList={setSummaryList}
      />
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
