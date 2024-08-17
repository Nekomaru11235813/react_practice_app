import React, { useCallback, useEffect } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import SaveIcon from '@mui/icons-material/Save'
import { DiaryDTO, SavedDiaryDTO, Summary } from '../../../../types/diaryApp'
import { DiaryAppServiceI } from '../API/diaryAppServiceI'
import { container } from '../../../app/diContainer'

export interface EditorAreaProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  nowEditingDiary: DiaryDTO
  setNowEditingDiary: (fn: (_: DiaryDTO) => DiaryDTO) => void
  setSummaryList: (fn: (_: Summary[]) => Summary[]) => void
}
export const EditorArea: React.FC<EditorAreaProps> = ({
  drawerOpen,
  toggleDrawer,
  nowEditingDiary,
  setNowEditingDiary,
  setSummaryList,
}) => {
  const diaryAppService = container.resolve<DiaryAppServiceI>('diaryAppService')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNowEditingDiary((prev: DiaryDTO) => {
      return { ...prev, [e.target.id]: e.target.value }
    })
  }
  const upsertDiary = () => {
    if (nowEditingDiary.id === undefined) {
      const createDiary = async () => {
        const result = await diaryAppService.createDiary(nowEditingDiary)
        const summaryList = await diaryAppService.getAllDiarySummary()
        setSummaryList(_ => summaryList)
      }
      createDiary()
    } else {
      const updateDiary = async () => {
        const savedDiary = nowEditingDiary as SavedDiaryDTO
        const result = await diaryAppService.updateDiary(savedDiary)
        const summaryList = await diaryAppService.getAllDiarySummary()
        setSummaryList(_ => summaryList)
      }
      updateDiary()
    }
  }

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
        <IconButton onClick={() => upsertDiary()}>
          <SaveIcon />
        </IconButton>
      </Box>
      <TextField
        id='title'
        fullWidth
        variant='outlined'
        placeholder='タイトル'
        value={nowEditingDiary.title}
        onChange={handleChange}
      ></TextField>
      <TextField
        id='content'
        multiline
        fullWidth
        rows={10}
        variant='outlined'
        placeholder='ここに日記を書きます'
        value={nowEditingDiary.content}
        onChange={handleChange}
      />
    </Box>
  )
}
