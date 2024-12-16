import React, { useCallback, useEffect } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MenuIcon from '@mui/icons-material/Menu'
import SaveIcon from '@mui/icons-material/Save'
import { DiaryDTO, SavedDiaryDTO, Summary } from '../../../../types/diaryApp'
import { DiaryAppServiceI } from '../API/diaryAppServiceI'
import { container } from '../../../app/diContainer'
import { TagEditField } from './TagEditField'
import { TagWithUUID } from '../../../../types/diaryApp'

export interface EditorAreaProps {
  drawerOpen: boolean
  toggleDrawer: () => void
  nowEditingDiary: DiaryDTO
  nowEditingDiaryTags: TagWithUUID[]
  setNowEditingDiary: (fn: (_: DiaryDTO) => DiaryDTO) => void
  setSummaryList: (fn: (_: Summary[]) => Summary[]) => void
}
export const EditorArea: React.FC<EditorAreaProps> = ({
  drawerOpen,
  toggleDrawer,
  nowEditingDiary,
  nowEditingDiaryTags,
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
        setNowEditingDiary(_ => result)
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
  const deleteDiary = () => {
    const deleteDiary = async () => {
      if (nowEditingDiary.id !== undefined) {
        const result = await diaryAppService.deleteDiary(nowEditingDiary.id)
        const summaryList = await diaryAppService.getAllDiarySummary()
        setSummaryList(_ => summaryList)
        if (summaryList.length > 0) {
          const diary = await diaryAppService.getDiary(summaryList[0].id.value)
          if (diary != undefined) {
            setNowEditingDiary(_ => diary)
          } else {
            console.error('The first diary is undefined')
          }
        } else {
          setNowEditingDiary(_ => {
            return {
              id: undefined,
              title: '',
              content: '',
              createdAt: undefined,
              updatedAt: undefined,
            }
          })
        }
      }
    }
    deleteDiary()
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
        <IconButton onClick={deleteDiary}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={upsertDiary}>
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
      <TagEditField tags={nowEditingDiaryTags} />
    </Box>
  )
}
