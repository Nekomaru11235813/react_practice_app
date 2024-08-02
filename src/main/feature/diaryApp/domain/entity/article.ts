export { Article }
import { Id, Ent, Saveable } from '../../../../common/typeUtil.js'
import * as O from 'fp-ts/lib/Option.js'
import { Do } from 'fp-ts-contrib/lib/Do.js'
import { container } from '../../../../diContainer.js'
import { ValidateI } from '../../../../common/validateInterface.js'

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
    id?: Id,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this._id = O.fromNullable(id)
    this.title = title
    this.content = content
    this._createdAt = O.fromNullable(createdAt)
    this._updatedAt = O.fromNullable(updatedAt)
    this.validate = container.resolve('ArticleValidate')
  }

  static of(title: string, content: string): Article {
    return new Article(title, content)
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
