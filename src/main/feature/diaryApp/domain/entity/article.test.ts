import { Id } from '../../../../common/typeUtil'
import { Article } from './article'
import { pipe } from 'fp-ts/lib/function.js'
import { Do } from 'fp-ts-contrib/lib/Do.js'
import * as E from 'fp-ts/lib/Either.js'
import 'reflect-metadata'

describe('Article', () => {
  test('equals', () => {
    const article1 = Article.of('title', 'content', new Id('id'))
    const article2 = Article.of('title', 'content', new Id('id'))
    const result = Do(E.Monad)
      .bind('article1', article1)
      .bind('article2', article2)
      .return(s => s.article1.equals(s.article2))

    expect(E.isRight(result) && result.right).toBeTruthy()
  })

  test('not equals', () => {
    const article1 = Article.of('title', 'content', new Id('id'))
    const article2 = Article.of('title', 'content', new Id('id2'))
    const result = Do(E.Monad)
      .bind('article1', article1)
      .bind('article2', article2)
      .return(s => s.article1.equals(s.article2))
    expect(E.isRight(result) && !result.right).toBeTruthy()
  })
})
