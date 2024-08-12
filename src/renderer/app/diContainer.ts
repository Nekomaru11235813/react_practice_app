import 'reflect-metadata'
import { container } from 'tsyringe'
import { DiaryAppServiceElectron } from '../features/DiaryApp/API/diaryAppServiceElectron'

container.register('diaryAppService', {
  useClass: DiaryAppServiceElectron,
})

export { container }
