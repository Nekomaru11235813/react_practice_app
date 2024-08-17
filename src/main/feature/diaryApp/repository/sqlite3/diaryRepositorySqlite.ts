export { DiaryRepositorySQlite }
import { DiaryRepositoryI } from '../diaryRepositoryI'
import * as TE from 'fp-ts/lib/TaskEither.js'
import { Article } from '../../domain/entity/article'
import { Id } from '../../../../common/typeUtil'
import Database from 'better-sqlite3'
import * as O from 'fp-ts/lib/Option.js'
import * as E from 'fp-ts/lib/Either.js'
import * as t from 'io-ts'
import { pipe } from 'fp-ts/lib/function.js'
import { withFallback } from 'io-ts-types/lib/withFallback'
import { Summary } from '../../domain/entity/summary'

const StringOrNull = withFallback(t.string, '')
const ArticleCodec = t.type({
  title: t.string,
  content: StringOrNull,
  id: t.number,
  created_at: t.string,
  updated_at: t.string,
})

class DiaryRepositorySQlite implements DiaryRepositoryI {
  private dbPath: string = 'foobar.db'

  public setDbPath(path: string): void {
    this.dbPath = path
  }

  private db() {
    return new Database(this.dbPath, { verbose: console.log })
  }

  init(): TE.TaskEither<Error, void> {
    return TE.tryCatch(
      async () => {
        const db = this.db()
        const initCommand = `DROP TABLE IF EXISTS diaries;
                              CREATE TABLE diaries (
                              id INTEGER PRIMARY KEY,
                              title VARCHAR(255) NOT NULL,
                              content TEXT NOT NULL,
                              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                              updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
                              
                              CREATE TRIGGER diaries_before_trigger AFTER UPDATE ON diaries
                                BEGIN
                                  UPDATE diaries SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
                                END`
        db.exec(initCommand)
      },
      e =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error has occurred while initializing database. : ' +
                String(e)
            )
    )
  }

  findById(id: Id): TE.TaskEither<Error, O.Option<Article>> {
    return TE.tryCatch(
      async () => {
        const row = this.db()
          .prepare('SELECT * FROM diaries WHERE id = ?')
          .get(id.value)
        if (!row) {
          return O.none
        }
        const articleEither = this.toArticle(row)
        if (E.isLeft(articleEither)) {
          throw articleEither.left
        }
        return O.some(articleEither.right)
      },
      (e: any) =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error occurred while finding article. : ' + String(e)
            )
    )
  }
  save(article: Article): TE.TaskEither<Error, Article> {
    return TE.tryCatch(
      async () => {
        const now = new Date()
        const db = this.db()
        const result = db
          .prepare('INSERT INTO diaries(title, content) VALUES(?, ?)')
          .run(article.title, article.content)
        const insertedArticle = db
          .prepare('SELECT * FROM diaries WHERE id = ?')
          .get(result.lastInsertRowid)
        if (!insertedArticle) {
          throw new Error('Failed to save article.')
        }
        return pipe(
          insertedArticle,
          this.toArticle,
          E.fold(
            e => {
              throw e
            },
            a => a
          )
        )
      },
      e =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error occurred while saving article. : ' + String(e)
            )
    )
  }
  delete(id: Id): TE.TaskEither<Error, Article> {
    return TE.tryCatch(
      async () => {
        const db = this.db()
        const article = db
          .prepare('SELECT * FROM diaries WHERE id = ?')
          .get(id.value)
        if (!article) {
          throw new Error('Article not found.')
        }
        db.prepare('DELETE FROM diaries WHERE id = ?').run(id.value)
        return pipe(
          article,
          this.toArticle,
          E.fold(
            e => {
              throw e
            },
            a => a
          )
        )
      },
      e =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error occurred while deleting article. : ' + String(e)
            )
    )
  }
  update(article: Article): TE.TaskEither<Error, Article> {
    return TE.tryCatch(
      async () => {
        if (O.isNone(article._id)) {
          throw new Error('Article id is required.')
        }
        const db = this.db()
        const now = new Date()
        const result = db
          .prepare('UPDATE diaries SET title = ?, content = ?  WHERE id = ?')
          .run(article.title, article.content, article._id.value.value)
        if (result.changes === 0) {
          throw new Error('Article not found.')
        }
        const updatedArticle = db
          .prepare('SELECT * FROM diaries WHERE id = ?')
          .get(article._id.value.value)
        if (!updatedArticle) {
          throw new Error('Failed to update article.')
        }
        return pipe(
          updatedArticle,
          this.toArticle,
          E.fold(
            e => {
              throw e
            },
            a => a
          )
        )
      },
      e =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error occurred while updating article. : ' + String(e)
            )
    )
  }

  getAllSummary(): TE.TaskEither<Error, Summary[]> {
    return TE.tryCatch(
      async () => {
        const db = this.db()
        const rowType = t.type({
          id: t.number,
          title: t.string,
          summary: StringOrNull,
          created_at: t.string,
          updated_at: t.string,
        })
        const rows = db
          .prepare(
            `SELECT id, 
                    SUBSTRING(content, 1, 100) AS summary,
                    title, 
                    created_at, 
                    updated_at 
              FROM diaries
              ORDER BY created_at DESC`
          )
          .all()
        const decodedRows = rows.map(row => rowType.decode(row))

        if (decodedRows.some(E.isLeft)) {
          throw new Error('Invalid row data.')
        }
        return decodedRows
          .filter(E.isRight)
          .map(x => x.right)
          .map(row => ({
            id: new Id(String(row.id)),
            title: row.title,
            summary: row.summary,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
          }))
      },
      e =>
        e instanceof Error
          ? e
          : new Error(
              'Unknown error occurred while getting all article names with ids. : ' +
                String(e)
            )
    )
  }

  private toArticle(row: unknown): E.Either<Error, Article> {
    if (!ArticleCodec.is(row)) {
      return E.left(new Error('Invalid row data.'))
    }
    return Article.of(
      row.title,
      row.content,
      new Id(String(row.id)),
      new Date(row.created_at),
      new Date(row.updated_at)
    )
  }
}
