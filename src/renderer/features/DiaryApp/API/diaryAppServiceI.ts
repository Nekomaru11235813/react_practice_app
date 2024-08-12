export { DiaryAppServiceI }

import { DiaryDTO, Summary } from '../../../../types/diaryApp'

interface DiaryAppServiceI {
  init(): Promise<void>
  getAllDiarySummary(): Promise<Summary[]>
  getDiary(id: string): Promise<DiaryDTO | undefined>
  createDiary(diary: DiaryDTO): Promise<DiaryDTO>
  updateDiary(diary: DiaryDTO): Promise<DiaryDTO>
  deleteDiary(id: string): Promise<DiaryDTO>
  sendHello(message: string): Promise<string>
}
