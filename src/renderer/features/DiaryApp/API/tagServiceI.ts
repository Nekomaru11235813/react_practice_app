import { Tag, Summary } from '../../../../types/diaryApp'

export interface TagServiceI {
  getTagsByPrefix(prefix: string): Promise<Tag[]>
  getTagsByArticleId(articleId: string): Promise<Tag[]>
  getSummariesByTagId(tagId: string): Promise<Summary[]>
}
