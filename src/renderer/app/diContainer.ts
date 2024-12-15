import 'reflect-metadata'
import { container } from 'tsyringe'
import { DiaryAppServiceElectron } from '../features/DiaryApp/API/diaryAppServiceElectron'
import { TagServiceMock } from '../features/DiaryApp/API/tagServiceMock'

container.register('diaryAppService', {
  useClass: DiaryAppServiceElectron,
})
container.register('tagService', {
  useClass: TagServiceMock,
})

export { container }
