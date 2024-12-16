import { TagServiceI } from './tagServiceI'
import { Tag, Summary } from '../../../../types/diaryApp'

const tags: Tag[] = [
  { id: '1', name: 'TypeScript', isSaved: true },
  { id: '2', name: 'JavaScript', isSaved: true },
  { id: '3', name: 'TryAndError', isSaved: true },
  { id: '4', name: 'Japanese', isSaved: true },
  { id: '5', name: 'Application', isSaved: true },
  { id: '6', name: 'Bicycle', isSaved: true },
  { id: '7', name: 'Chocolate', isSaved: true },
  { id: '8', name: 'typeWriter', isSaved: true },
]
const summaries: Summary[] = ['Summary1', 'Summary2', 'Summary3'].map(
  (title, index) => {
    return {
      id: { tag: 'Id', value: index.toString() },
      title: title,
      summary: 'title' + '_summary',
      createdAt: new Date(2024, 1, 1, 0, 0, 0),
      updatedAt: new Date(2024, 1, 1, 0, 0, 0),
    }
  }
)

const tagSummaryJoin = [
  { tagId: 1, summaryId: 1 },
  { tagId: 2, summaryId: 2 },
  { tagId: 3, summaryId: 3 },
  { tagId: 4, summaryId: 1 },
  { tagId: 5, summaryId: 2 },
  { tagId: 6, summaryId: 3 },
  { tagId: 7, summaryId: 1 },
  { tagId: 8, summaryId: 2 },
]

export class TagServiceMock implements TagServiceI {
  getTagsByPrefix(prefix: string): Promise<Tag[]> {
    return Promise.resolve(
      tags.filter(tag =>
        tag.name.toLowerCase().startsWith(prefix.toLowerCase())
      )
    )
  }
  getTagsByArticleId(articleId: string): Promise<Tag[]> {
    return Promise.resolve(
      tagSummaryJoin
        .filter(join => join.summaryId.toString() === articleId)
        .map(join => tags.filter(tag => tag.id === join.tagId.toString()))
        .flat()
    )
  }
  getSummariesByTagId(tagId: string): Promise<Summary[]> {
    return Promise.resolve(
      tagSummaryJoin
        .filter(join => join.tagId.toString() === tagId)
        .map(join =>
          summaries.filter(
            summary => summary.id.value === join.summaryId.toString()
          )
        )
        .flat()
    )
  }
}
