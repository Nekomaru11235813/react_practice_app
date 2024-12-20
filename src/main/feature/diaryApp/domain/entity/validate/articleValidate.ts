export { ArticleValidate }

import { ValidateI } from '../../../../../common/validateInterface'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import 'reflect-metadata'
import { injectable } from 'tsyringe'

@injectable()
class ArticleValidate implements ValidateI {
  readonly _tag = 'ArticleValidate'

  validate(input: { title: string; content: string }) {
    const validates = [
      this.titleMustNotBeEmpty(input.title),
      this.contentMustNotBeEmpty(input.content),
    ]
    return pipe(
      validates,
      E.sequenceArray,
      E.map(() => true)
    )
  }

  titleMustNotBeEmpty(title: string) {
    return title.length !== 0
      ? E.right(true)
      : E.left(new Error('title is empty'))
  }

  contentMustNotBeEmpty(content: unknown) {
    return typeof content === 'string'
      ? E.right(true)
      : E.left(new Error('content is not string'))
  }
}
