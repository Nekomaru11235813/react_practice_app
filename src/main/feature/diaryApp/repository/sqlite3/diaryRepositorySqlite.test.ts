import { DiaryRepositorySQlite } from './diaryRepositorySqlite'
import * as E from 'fp-ts/lib/Either.js'
import { Article } from '../../domain/entity/article'
import { Id } from '../../../../common/typeUtil'
import { fail } from 'assert'
import * as O from 'fp-ts/lib/Option.js'

describe('DiaryRepositorySQlite_HappyPath', () => {
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
    expect(E.isRight(findResult) && O.isNone(findResult.right)).toBeTruthy()
  })

  it('should update article', async () => {
    const saveResult = await diaryRepository.findById(new Id('1'))()
    expect(E.isRight(saveResult)).toBeTruthy()
    if (E.isLeft(saveResult)) {
      fail(saveResult.left)
    }
    const updatedArticle = Article.of('baz', 'qux', new Id('1'))
    expect(E.isRight(updatedArticle)).toBeTruthy()
    if (E.isLeft(updatedArticle)) {
      fail(updatedArticle.left)
    }
    // wait for 1 second to update _updatedAt
    const wait = await new Promise(resolve => setTimeout(resolve, 1000))
    const result = await diaryRepository.update(updatedArticle.right)()
    if (E.isLeft(result)) {
      fail(result.left)
    }
    expect(E.isRight(result)).toBeTruthy()

    const findResult = await diaryRepository.findById(new Id('1'))()
    expect(E.isRight(findResult)).toBeTruthy()
    if (E.isLeft(findResult)) {
      fail(findResult.left)
    }
    if (O.isNone(findResult.right)) {
      fail('findResult is None')
    }
    expect(findResult.right.value.title).toBe('baz')
    expect(findResult.right.value.content).toBe('qux')
    expect(findResult.right.value._createdAt).not.toEqual(
      findResult.right.value._updatedAt
    )
  })
})
