import { createDecipheriv } from 'crypto'
import { create } from 'domain'
import { contextBridge, ipcRenderer } from 'electron'
import { DiaryDTO } from '../../types/diaryApp'

export function diaryAppAPIPreload() {
  contextBridge.exposeInMainWorld('diaryAPI', {
    init: () => ipcRenderer.invoke('init'),
    sendHello: (data: string) => ipcRenderer.invoke('send-hello', data),
    getAllDiarySummary: () => ipcRenderer.invoke('get-all-diary-summary'),
    getDiary: (arg: { id: string }) => ipcRenderer.invoke('get-diary', arg),
    createDiary: (dto: DiaryDTO) => ipcRenderer.invoke('create-diary', dto),
    updateDiary: (dto: DiaryDTO) => ipcRenderer.invoke('update-diary', dto),
    deleteDiary: (arg: { id: string }) =>
      ipcRenderer.invoke('delete-diary', arg),
  })
}
