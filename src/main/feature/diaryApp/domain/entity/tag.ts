import { Id, Ent, Vo } from '../../../../common/typeUtil'
import * as O from 'fp-ts/lib/Option'
import { ValidateI } from '../../../../common/validateInterface'
import { container } from '../../../../diContainer'

export class Tag implements Ent<Tag>, Vo<Tag> {
  _id: O.Option<Id>
  name: string
  readonly _tag = 'Tag'
  readonly validate: ValidateI

  private constructor(_id: O.Option<Id>, name: string) {
    this._id = _id
    this.name = name
    this.validate = container.resolve('TagValidate')
  }

  static of(name: string, id?: Id): Tag {
    return new Tag(O.fromNullable(id), name)
  }

  equals(other: Tag): boolean {
    return this.name === other.name // name should be unique
  }
}
