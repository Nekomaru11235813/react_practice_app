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
import { DiaryDTO } from '../../../../types/diaryApp'
import { DiaryAppServiceI } from '../API/diaryAppServiceI'
import { container } from '../../../app/diContainer'

export interface DrawerMenuProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  summaryList: Summary[]
  nowEditingDiary: DiaryDTO
  setNowEditingDiary: (diary: DiaryDTO) => void
  setSummaryList: (fn: (_: Summary[]) => Summary[]) => void
}

export const DrawerMenu: React.FC<DrawerMenuProps> = ({
  drawerOpen,
  toggleDrawer,
  summaryList,
  nowEditingDiary,
  setNowEditingDiary,
  setSummaryList,
}) => {
  const diaryAppService = container.resolve<DiaryAppServiceI>('diaryAppService')
  const handleListItemClick = (id: string) => {
    diaryAppService
      .getDiary(id)
      .then(diary => {
        if (diary != undefined) {
          setNowEditingDiary(diary)
        } else {
          console.error('The diary is undefined')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const createEditingDiary = () => {
    setNowEditingDiary({
      id: undefined,
      title: '',
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }

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
      <Button
        fullWidth
        variant='contained'
        color='primary'
        onClick={createEditingDiary}
      >
        新規作成
      </Button>
      <List>
        {nowEditingDiary.id == undefined && (
          <ListItemButton>
            <ListItemText
              primary={'(未保存)' + nowEditingDiary.title}
              secondary={'(未保存)'}
            />
          </ListItemButton>
        )}
        {summaryList
          .sort((a, b) => parseInt(b.id.value) - parseInt(a.id.value))
          .map((summary, index) => (
            <ListItemButton key={summary.id.value}>
              <ListItemText
                primary={summary.title}
                secondary={summary.createdAt.toDateString()}
                onClick={() => handleListItemClick(summary.id.value)}
              />
            </ListItemButton>
          ))}
      </List>
    </Drawer>
  )
}
