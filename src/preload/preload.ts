import { contextBridge, ipcRenderer } from 'electron'
import { diaryAppAPIPreload } from './features/diaryAppAPI'
export {}

diaryAppAPIPreload()
