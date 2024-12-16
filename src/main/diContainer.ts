export { container }
import 'reflect-metadata'
import { container } from 'tsyringe'
import { ArticleValidate } from './feature/diaryApp/domain/entity/validate/articleValidate'
import { IdValidate } from './common/idValidate'
import { DiaryRepositorySQlite } from './feature/diaryApp/repository/sqlite3/diaryRepositorySqlite'
import { TagValidate } from './feature/diaryApp/domain/entity/validate/tagValidate'

container.register('ArticleValidate', {
  useClass: ArticleValidate,
})
container.register('IdValidate', {
  useClass: IdValidate,
})

container.register('TagValidate', {
  useClass: TagValidate,
})

container.register('DiaryRepository', {
  useClass: DiaryRepositorySQlite,
})
