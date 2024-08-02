export { ArticleValidate }

import { ValidateI } from '../../../../../common/validateInterface'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import { injectable } from 'tsyringe'

@injectable()
class ArticleValidate implements ValidateI {
  readonly _tag = 'ArticleValidate'

  validate(input: { title: string; content: string }) {
    const validates = [this.titleMustNotBeEmpty(input.title)]
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
}
