export { container }
import 'reflect-metadata'
import { container } from 'tsyringe'
import { ArticleValidate } from './feature/diaryApp/domain/entity/validate/articleValidate'
import { IdValidate } from './common/idValidate'

container.register('ArticleValidate', {
  useClass: ArticleValidate,
})
container.register('IdValidate', {
  useClass: IdValidate,
})
