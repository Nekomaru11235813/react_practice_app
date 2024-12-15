export type DiaryDTO = {
  id: string | undefined
  title: string
  content: string
  createdAt: Date | undefined
  updatedAt: Date | undefined
}
export type SavedDiaryDTO = {
  id: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export type Tag = {
  id: number
  name: string
  isSaved: boolean
}

export type Summary = {
  id: { tag: 'Id'; value: string }
  title: string
  summary: string
  createdAt: Date
  updatedAt: Date
}

declare global {
  interface Window {
    diaryAPI: {
      init: () => Promise<void>
      sendHello: (message: string) => Promise<string>
      getAllDiarySummary: () => Promise<Summary[]>
      getDiary: (arg: { id: string }) => Promise<SavedDiaryDTO | undefined>
      createDiary: (diary: DiaryDTO) => Promise<SavedDiaryDTO>
      updateDiary: (diary: SavedDiaryDTO) => Promise<SavedDiaryDTO>
      deleteDiary: (arg: { id: string }) => Promise<SavedDiaryDTO>
    }
  }
}
