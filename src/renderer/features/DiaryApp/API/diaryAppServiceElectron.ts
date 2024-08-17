export { DiaryAppServiceElectron }
import { DiaryAppServiceI } from './diaryAppServiceI'
import { DiaryDTO, SavedDiaryDTO, Summary } from '../../../../types/diaryApp'

class DiaryAppServiceElectron implements DiaryAppServiceI {
  async init(): Promise<void> {
    return await window.diaryAPI.init()
  }

  async getAllDiarySummary(): Promise<Summary[]> {
    return await window.diaryAPI.getAllDiarySummary()
  }

  async getDiary(id: string): Promise<SavedDiaryDTO | undefined> {
    return await window.diaryAPI.getDiary({ id })
  }

  async createDiary(diary: DiaryDTO): Promise<SavedDiaryDTO> {
    return await window.diaryAPI.createDiary(diary)
  }

  async updateDiary(diary: SavedDiaryDTO): Promise<SavedDiaryDTO> {
    return await window.diaryAPI.updateDiary(diary)
  }

  async deleteDiary(id: string): Promise<SavedDiaryDTO> {
    return await window.diaryAPI.deleteDiary({ id })
  }

  async sendHello(message: string): Promise<string> {
    return await window.diaryAPI.sendHello(message)
  }
}
