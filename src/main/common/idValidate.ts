export { IdValidate }
import { ValidateI } from './validateInterface'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import 'reflect-metadata'
import { injectable } from 'tsyringe'

@injectable()
class IdValidate implements ValidateI {
  readonly _tag = 'IdValidate'

  validate(input: string): E.Either<Error, boolean> {
    const validates = [this.isString(input), this.IdMustNotBeEmpty(input)]
    return pipe(
      validates,
      E.sequenceArray,
      E.map(() => true)
    )
  }

  isString(input: string) {
    return typeof input === 'string'
      ? E.right(true)
      : E.left(new Error('input is not string'))
  }

  IdMustNotBeEmpty(input: string) {
    return input.length !== 0 ? E.right(true) : E.left(new Error('id is empty'))
  }
}
