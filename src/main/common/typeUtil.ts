export { Typed, Vo, Id, Ent, Saveable }
import * as Eq from 'fp-ts/lib/Eq.js'
import * as O from 'fp-ts/lib/Option.js'
import { ValidateI } from './validateInterface'
import { container } from 'tsyringe'

interface Typed {
  readonly _tag: string
}

abstract class Vo<T> implements Eq.Eq<T>, Typed {
  abstract validate: ValidateI
  abstract _tag: string
  abstract toString(): string
  abstract equals(other: T): boolean
}

interface Saveable {
  readonly _createdAt: O.Option<Date>
  readonly _updatedAt: O.Option<Date>
}

interface Ent<T> extends Eq.Eq<T>, Typed {
  readonly validate: ValidateI
  readonly _id: O.Option<Id>
  equals(other: T): boolean
}
class Id implements Vo<Id> {
  _tag = 'Id'
  readonly value: string
  readonly validate: ValidateI

  constructor(value: string) {
    this.value = value
    this.validate = container.resolve('IdValidate')
  }
  equals(other: Id): boolean {
    return this.value === other.value
  }
  toString(): string {
    return this.value
  }
}
