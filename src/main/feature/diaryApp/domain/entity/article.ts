export { Article }
import { Id, Ent, Saveable } from '../../../../common/typeUtil'
import * as O from 'fp-ts/lib/Option.js'
import { Do } from 'fp-ts-contrib/lib/Do.js'
import { container } from '../../../../diContainer'
import { ValidateI } from '../../../../common/validateInterface'
import * as E from 'fp-ts/lib/Either.js'

class Article implements Ent<Article>, Saveable {
  readonly _id: O.Option<Id>
  readonly _tag = 'Article'
  readonly title: string
  readonly content: string
  readonly _createdAt: O.Option<Date>
  readonly _updatedAt: O.Option<Date>
  readonly validate: ValidateI

  constructor(
    title: string,
    content: string,
    id: O.Option<Id>,
    createdAt: O.Option<Date>,
    updatedAt: O.Option<Date>
  ) {
    this._id = id
    this.title = title
    this.content = content
    this._createdAt = createdAt
    this._updatedAt = updatedAt
    this.validate = container.resolve('ArticleValidate')
  }

  static of(
    title: string,
    content: string,
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ): E.Either<Error, Article> {
    const validate = container.resolve('ArticleValidate') as ValidateI
    const result = validate.validate({ title, content })
    if (E.isLeft(result)) {
      return result
    } else {
      return E.right(
        new Article(
          title,
          content,
          O.fromNullable(id),
          O.fromNullable(createdAt),
          O.fromNullable(updatedAt)
        )
      )
    }
  }

  equals(other: Article): boolean {
    const idEqual = Do(O.Monad)
      .bind('idSelf', this._id)
      .bind('idOther', other._id)
      .bindL('idEq', ({ idSelf, idOther }) => O.some(idSelf.equals(idOther)))
      .return(({ idEq }) => idEq)
    return O.isSome(idEqual) ? idEqual.value : this === other
  }
}
