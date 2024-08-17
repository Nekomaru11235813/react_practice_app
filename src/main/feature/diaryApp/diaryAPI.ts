import { IpcMain } from 'electron'
import 'reflect-metadata'
import { DiaryApplicationService } from './application/appServicies/diaryApplicationService'
import * as E from 'fp-ts/Either'
import * as O from 'fp-ts/Option'
import { ArticleFindCommand } from './application/command/articleFindCommand'
import { ArticleSaveCommand } from './application/command/articleSaveCommand'
import { DiaryDTO, SavedDiaryDTO } from '../../../types/diaryApp'
import { ArticleUpdateCommand } from './application/command/articleUpdateCommand'
import { Article } from './domain/entity/article'

export const diaryAPI = (ipcMain: IpcMain): void => {
  ipcMain.handle('init', async (event, args) => {
    const app = new DiaryApplicationService()
    const result = await app.init()()
    if (E.isLeft(result)) {
      throw result.left
    }
  })

  ipcMain.handle('get-all-diary-summary', async (event, args) => {
    const app = new DiaryApplicationService()
    const summaries = await app.getAllSummary()()
    if (E.isLeft(summaries)) {
      throw summaries.left
    } else {
      return summaries.right
    }
  })

  ipcMain.handle(
    'get-diary',
    async (event, args: { id: string }): Promise<SavedDiaryDTO | undefined> => {
      const app = new DiaryApplicationService()
      const command = new ArticleFindCommand(args.id)
      const diary = await app.findArticleById(command)()
      if (E.isLeft(diary)) {
        throw diary.left
      } else {
        return O.isSome(diary.right)
          ? articleToSavedDto(diary.right.value)
          : undefined
      }
    }
  )

  ipcMain.handle(
    'create-diary',
    async (event, dto: DiaryDTO): Promise<DiaryDTO> => {
      const app = new DiaryApplicationService()
      const command = new ArticleSaveCommand(dto.title, dto.content)
      const diary = await app.saveArticle(command)()
      if (E.isLeft(diary)) {
        throw diary.left
      } else {
        return articleToSavedDto(diary.right)
      }
    }
  )

  ipcMain.handle(
    'update-diary',
    async (event, dto: DiaryDTO): Promise<DiaryDTO> => {
      const app = new DiaryApplicationService()
      if (!dto.id) {
        throw new Error('id is required')
      }
      const command = new ArticleUpdateCommand(dto.id, dto.title, dto.content)
      const diary = await app.updateArticle(command)()
      if (E.isLeft(diary)) {
        throw diary.left
      } else {
        return articleToSavedDto(diary.right)
      }
    }
  )

  ipcMain.handle(
    'delete-diary',
    async (event, arg: { id: string }): Promise<DiaryDTO> => {
      const app = new DiaryApplicationService()
      const command = new ArticleFindCommand(arg.id)
      const deletedArticle = await app.deleteArticle(command)()
      if (E.isLeft(deletedArticle)) {
        throw deletedArticle.left
      } else {
        return articleToSavedDto(deletedArticle.right)
      }
    }
  )

  ipcMain.handle('send-hello', async (event, args) => {
    return `Hello ${args}`
  })
}

function articleToSavedDto(savedArticle: Article): SavedDiaryDTO {
  if (
    O.isNone(savedArticle._id) ||
    O.isNone(savedArticle._createdAt) ||
    O.isNone(savedArticle._updatedAt)
  ) {
    throw new Error('Invalid article')
  }

  return {
    id: savedArticle._id.value.value,
    title: savedArticle.title,
    content: savedArticle.content,
    createdAt: savedArticle._createdAt.value,
    updatedAt: savedArticle._updatedAt.value,
  }
}
