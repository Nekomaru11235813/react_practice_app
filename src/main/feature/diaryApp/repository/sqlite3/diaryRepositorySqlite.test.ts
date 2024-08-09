import { DiaryRepositorySQlite } from './diaryRepositorySqlite'
import * as E from 'fp-ts/lib/Either.js'
import { Article } from '../../domain/entity/article'
import { Id } from '../../../../common/typeUtil'

describe('DiaryRepositorySQlite', () => {
  let diaryRepository: DiaryRepositorySQlite
  let init: E.Either<Error, void>
  let sampleArtcile: E.Either<Error, Article>
  let save: E.Either<Error, Article>

  beforeEach(async () => {
    diaryRepository = new DiaryRepositorySQlite()
    diaryRepository.setDbPath('testArticle.db')
    init = await diaryRepository.init()()
    if (E.isLeft(init)) {
      console.error(init.left)
      return
    }
    sampleArtcile = Article.of('title', 'content')
    if (E.isLeft(sampleArtcile)) {
      console.error(sampleArtcile.left)
      return
    }
    save = await diaryRepository.save(sampleArtcile.right)()
    if (E.isLeft(save)) {
      console.error(save.left)
      return
    }
  })
  it('should initialize database', async () => {
    expect(E.isRight(init)).toBeTruthy()
    expect(E.isRight(sampleArtcile)).toBeTruthy()
    expect(E.isRight(save)).toBeTruthy()
  })

  it('should find article by id', async () => {
    const result = await diaryRepository.findById(new Id('1'))()
    expect(E.isRight(result)).toBeTruthy()
  })

  it('should save article', async () => {
    const sampleArticle = Article.of('foo', 'bar')
    expect(E.isRight(sampleArticle)).toBeTruthy()
    if (E.isLeft(sampleArticle)) {
      console.error(sampleArticle.left)
      return
    }
    const result = await diaryRepository.save(sampleArticle.right)()
    expect(E.isRight(result)).toBeTruthy()
  })

  it('should delete article by id', async () => {
    const result = await diaryRepository.delete(new Id('1'))()
    expect(E.isRight(result)).toBeTruthy()

    const findResult = await diaryRepository.findById(new Id('1'))()
    expect(E.isLeft(findResult)).toBeTruthy()
  })

  it('should update article', async () => {
    const saveResult = await diaryRepository.findById(new Id('1'))()
    expect(E.isRight(saveResult)).toBeTruthy()
    if (E.isLeft(saveResult)) {
      console.error(saveResult.left)
      return
    }
    const updatedArticle = Article.of('baz', 'qux', new Id('1'))
    expect(E.isRight(updatedArticle)).toBeTruthy()
    if (E.isLeft(updatedArticle)) {
      console.error(updatedArticle.left)
      return
    }
    const result = await diaryRepository.update(updatedArticle.right)()
    if (E.isLeft(result)) {
      console.error(result.left)
      return
    }
    expect(E.isRight(result)).toBeTruthy()

    const findResult = await diaryRepository.findById(new Id('1'))()
    expect(E.isRight(findResult)).toBeTruthy()
    if (E.isLeft(findResult)) {
      console.log(findResult.left)
      return
    }
    expect(findResult.right.title).toBe('baz')
    expect(findResult.right.content).toBe('qux')
  })
})
