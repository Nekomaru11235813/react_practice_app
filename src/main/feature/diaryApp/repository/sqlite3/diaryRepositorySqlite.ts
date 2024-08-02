export { DiaryRepositorySQlite }
import { DiaryRepositoryI } from '../diaryRepositoryI.js'
import * as TE from 'fp-ts/lib/TaskEither.js'
import { Article } from '../../domain/entity/article.js'
import { Id } from '../../../../common/typeUtil.js'

class DiaryRepositorySQlite implements DiaryRepositoryI {
  findById(id: Id): TE.TaskEither<Error, Article> {
    return TE.left(new Error('Method not implemented.'))
  }
  save(article: Article): TE.TaskEither<Error, Article> {
    return TE.left(new Error('Method not implemented.'))
  }
  delete(id: Id): TE.TaskEither<Error, Article> {
    return TE.left(new Error('Method not implemented.'))
  }
  update(article: Article): TE.TaskEither<Error, Article> {
    return TE.left(new Error('Method not implemented.'))
  }
}
