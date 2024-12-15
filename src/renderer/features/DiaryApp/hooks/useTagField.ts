import React from 'react'
import { Tag } from '../../../../types/diaryApp'
import { TagServiceI } from '../API/tagServiceI'

export const useTagField = (
  defaultTags: Tag[],
  defaultInputValue: string,
  tagService: TagServiceI
) => {
  const [textValue, setTextValue] = React.useState<string>(defaultInputValue)
  const [tags, setTags] = React.useState<Tag[]>(defaultTags)
  const [suggestTimer, setSuggestTimer] = React.useState<NodeJS.Timeout | null>(
    null
  )
  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([])
  const delimiters = /[ 　\t\n]/g
  const hasDelimiter = (text: string) => {
    return text.match(delimiters) !== null
  }
  const isValidNewTag = (tagName: string, tags: Tag[]) => {
    return (
      tagName.match(delimiters) == null &&
      tagName !== '' &&
      !tags.some(t => t.name === tagName)
    )
  }
  const generateNewTags = (inputValue: string, tags: Tag[]) => {
    const lastId = tags.length > 0 ? tags[tags.length - 1].id : 0
    const newTags = inputValue
      .split(delimiters)
      .filter(tagName => isValidNewTag(tagName, tags))
      .map((tagName, index) => {
        return { id: lastId + index + 1, name: tagName, isSaved: false }
      })
    return [...tags, ...newTags]
  }

  const resetTimer = (
    callBack: () => void,
    ms: number,
    oldTimer: NodeJS.Timeout | null,
    setTimer: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>
  ) => {
    if (oldTimer) {
      clearTimeout(oldTimer)
      setTimer(null)
    }
    setTimer(setTimeout(callBack, ms))
  }
  const fetchSuggestions = async (inputValue: string) => {
    try {
      const tags = await tagService.getTagsByPrefix(inputValue)
      setTagSuggestions(tags)
    } catch {
      console.error('Failed to fetch tag suggestions')
      setTagSuggestions([])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    console.log({ inputValue: inputValue })
    if (!inputValue) {
      resetTimer(() => {}, 0, suggestTimer, setSuggestTimer)
      setTagSuggestions([])
      setTextValue('')
    } else if (hasDelimiter(inputValue)) {
      resetTimer(() => {}, 0, suggestTimer, setSuggestTimer)
      setTags(generateNewTags(inputValue, tags))
      setTagSuggestions([])
      setTextValue('')
    } else {
      resetTimer(
        () => fetchSuggestions(inputValue),
        500,
        suggestTimer,
        setSuggestTimer
      )
      setTextValue(inputValue)
    }
  }

  return { textValue, tags, tagSuggestions, setTags, handleChange }
}
