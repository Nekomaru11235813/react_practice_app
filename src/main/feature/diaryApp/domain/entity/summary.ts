export { Summary }
import { Id } from '../../../../common/typeUtil'

type Summary = {
  id: Id
  summary: string
  title: string
  createdAt: Date
  updatedAt: Date
}
