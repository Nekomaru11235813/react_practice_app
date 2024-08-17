import { contextBridge, ipcRenderer } from 'electron'
import { DiaryDTO } from '../../types/diaryApp'

export function diaryAppAPIPreload() {
  contextBridge.exposeInMainWorld('diaryAPI', {
    init: () => {
      try {
        return ipcRenderer.invoke('init')
      } catch (e: any) {
        throwError(e)
      }
    },
    sendHello: (data: string) => {
      try {
        return ipcRenderer.invoke('send-hello', data)
      } catch (e: any) {
        throwError(e)
      }
    },
    getAllDiarySummary: () => {
      try {
        return ipcRenderer.invoke('get-all-diary-summary')
      } catch (e: any) {
        throwError(e)
      }
    },
    getDiary: (arg: { id: string }) => {
      try {
        return ipcRenderer.invoke('get-diary', arg)
      } catch (e: any) {
        throwError(e)
      }
    },
    createDiary: (dto: DiaryDTO) => {
      try {
        return ipcRenderer.invoke('create-diary', dto)
      } catch (e: any) {
        throwError(e)
      }
    },
    updateDiary: (dto: DiaryDTO) => {
      try {
        return ipcRenderer.invoke('update-diary', dto)
      } catch (e: any) {
        throwError(e)
      }
    },
    deleteDiary: (arg: { id: string }) => {
      try {
        return ipcRenderer.invoke('delete-diary', arg)
      } catch (e: any) {
        throwError(e)
      }
    },
  })
}

function throwError(e: any) {
  throw Error(String(e) + String(e.stack))
}
