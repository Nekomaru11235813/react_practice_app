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
})
