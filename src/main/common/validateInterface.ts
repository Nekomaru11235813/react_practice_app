export { ValidateI }
import { Typed } from './typeUtil.ts'
import * as E from 'fp-ts/lib/Either.js'

interface ValidateI extends Typed {
  validate(input: unknown): E.Either<Error, boolean>
}
