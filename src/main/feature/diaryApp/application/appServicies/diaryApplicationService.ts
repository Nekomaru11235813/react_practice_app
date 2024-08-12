export { DiaryApplicationService }
import { container } from '../../../../diContainer'
import { Article } from '../../domain/entity/article'
import { Id } from '../../../../common/typeUtil'
import { DiaryRepositoryI } from '../../repository/diaryRepositoryI'
import { injectable } from 'tsyringe'
import * as TE from 'fp-ts/lib/TaskEither.js'
import { ArticleSaveCommand } from '../command/articleSaveCommand'
import * as E from 'fp-ts/lib/Either.js'
import { ArticleDeleteCommand } from '../command/articleDeleteCommand'
import { Summary } from '../../domain/entity/summary'
import { ArticleFindCommand } from '../command/articleFindCommand'
import { ArticleUpdateCommand } from '../command/articleUpdateCommand'
import * as O from 'fp-ts/lib/Option.js'
import { Do } from 'fp-ts-contrib/lib/Do.js'
import { pipe } from 'fp-ts/lib/function.js'

@injectable()
class DiaryApplicationService {
  repository: DiaryRepositoryI

  constructor() {
    this.repository = container.resolve('DiaryRepository')
  }

  init(): TE.TaskEither<Error, void> {
    return this.repository.init()
  }

  saveArticle(command: ArticleSaveCommand): TE.TaskEither<Error, Article> {
    const article = Article.of(command.title, command.content)
    return E.isLeft(article)
      ? TE.left(article.left)
      : this.repository.save(article.right)
  }

  deleteArticle(command: ArticleDeleteCommand): TE.TaskEither<Error, Article> {
    return Do(TE.Monad)
      .bind('articleOption', this.repository.findById(new Id(command.id)))
      .bindL('article', ({ articleOption }) => {
        return pipe(
          articleOption,
          O.fold(
            () => TE.left(new Error('Article not found')),
            article => this.repository.delete(new Id(command.id))
          )
        )
      })
      .return(({ article }) => article)
  }

  findArticleById(
    command: ArticleFindCommand
  ): TE.TaskEither<Error, O.Option<Article>> {
    return this.repository.findById(new Id(command.id))
  }

  updateArticle(command: ArticleUpdateCommand): TE.TaskEither<Error, Article> {
    return Do(TE.Monad)
      .bind(
        'articleEither',
        TE.fromEither(
          Article.of(command.title, command.content, new Id(command.id))
        )
      )
      .bind('articleOption', this.repository.findById(new Id(command.id)))
      .bindL('article', ({ articleOption }) => {
        return pipe(
          articleOption,
          O.fold(
            () => TE.left(new Error('Article not found')),
            article => this.repository.update(article)
          )
        )
      })
      .bindL('updatedArticle', ({ article }) => {
        return this.repository.update(article)
      })
      .return(({ updatedArticle }) => updatedArticle)
  }

  getAllSummary(): TE.TaskEither<Error, Summary[]> {
    return this.repository.getAllSummary()
  }
}
