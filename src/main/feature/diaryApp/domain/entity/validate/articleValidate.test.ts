import { ArticleValidate } from './articleValidate'
import * as E from 'fp-ts/lib/Either.js'

describe('ArticleValidate', () => {
  const articleValidate = new ArticleValidate()

  test('title is empty', () => {
    const input = {
      title: '',
      content: 'content',
    }
    const result = articleValidate.validate(input)
    expect(E.isLeft(result)).toBeTruthy()
  })

  test('title is not empty', () => {
    const input = {
      title: 'title',
      content: 'content',
    }
    const result = articleValidate.validate(input)
    expect(E.isRight(result)).toBeTruthy()
  })

  test('content is not string', () => {
    const input2 = {
      title: 'title',
      content: undefined,
    } as any
    const result2 = articleValidate.validate(input2)
    expect(E.isLeft(result2)).toBeTruthy()

    const input3 = {
      title: 'title',
      content: null,
    } as any
    const result3 = articleValidate.validate(input3)
    expect(E.isLeft(result3)).toBeTruthy()
  })
})
