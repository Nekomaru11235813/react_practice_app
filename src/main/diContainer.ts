export { container }
import { container } from 'tsyringe'
import { ArticleValidate } from './feature/diaryApp/domain/entity/validate/articleValidate.js'
import { IdValidate } from './common/idValidate.js'

container.register('ArticleValidate', {
  useClass: ArticleValidate,
})
container.register('IdValidate', {
  useClass: IdValidate,
})
