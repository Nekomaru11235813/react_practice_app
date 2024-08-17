export { DiaryRepositoryI }
import { Id } from '../../../common/typeUtil'
import * as TE from 'fp-ts/lib/TaskEither.js'
import { Article } from '../domain/entity/article'
import { Summary } from '../domain/entity/summary'
import * as O from 'fp-ts/lib/Option.js'

interface DiaryRepositoryI {
  init(): TE.TaskEither<Error, void>
  findById(id: Id): TE.TaskEither<Error, O.Option<Article>>
  save(article: Article): TE.TaskEither<Error, Article>
  delete(id: Id): TE.TaskEither<Error, Article>
  update(article: Article): TE.TaskEither<Error, Article>
  getAllSummary(): TE.TaskEither<Error, Summary[]>
}
