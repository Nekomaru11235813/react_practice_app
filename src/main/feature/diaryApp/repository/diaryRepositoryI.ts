export { DiaryRepositoryI }
import { Id } from '../../../common/typeUtil.js'
import * as TE from 'fp-ts/lib/TaskEither.js'
import { Article } from '../domain/entity/article.js'

interface DiaryRepositoryI {
  findById(id: Id): TE.TaskEither<Error, Article>
  save(article: Article): TE.TaskEither<Error, Article>
  delete(id: Id): TE.TaskEither<Error, Article>
  update(article: Article): TE.TaskEither<Error, Article>
}
