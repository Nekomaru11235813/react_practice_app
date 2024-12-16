import { ValidateI } from '../../../../../common/validateInterface'
import * as E from 'fp-ts/lib/Either.js'
import { pipe } from 'fp-ts/lib/function.js'
import 'reflect-metadata'
import { injectable } from 'tsyringe'

@injectable()
export class TagValidate implements ValidateI {
  readonly _tag = 'TagValidate'

  validate(input: { name: string }) {
    const validates = [
      this.nameMustNotBeEmpty(input.name),
      this.nameMustBeShorterThan(input.name, 30),
    ]
    return pipe(
      validates,
      E.sequenceArray,
      E.map(() => true)
    )
  }

  nameMustBeShorterThan(name: string, length: number) {
    return name.length < length
      ? E.right(true)
      : E.left(new Error('name is too long'))
  }

  nameMustNotBeEmpty(name: string) {
    return name.length !== 0
      ? E.right(true)
      : E.left(new Error('name is empty'))
  }
}
