import React from 'react'
import { Tag } from '../../../../types/diaryApp'
import { TagServiceI } from '../API/tagServiceI'

export const useTagField = (
  defaultTags: Tag[],
  defaultInputValue: string,
  tagService: TagServiceI
) => {
  // Constants
  const DELIMITERS = /[ 　\t\n]/g
  // State
  const [textValue, setTextValue] = React.useState<string>(defaultInputValue)
  const [tags, setTags] = React.useState<Tag[]>(defaultTags)
  const [suggestTimer, setSuggestTimer] = React.useState<NodeJS.Timeout | null>(
    null
  )
  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([])

  // useEffect
  React.useEffect(() => {
    setTags(defaultTags)
    setTextValue(defaultInputValue)
  }, [defaultTags, defaultInputValue])

  // Functions
  // Helper functions
  const hasDelimiter = (text: string) => {
    return text.match(DELIMITERS) !== null
  }
  const isValidNewTag = (tagName: string, tags: Tag[]) => {
    return (
      tagName.match(DELIMITERS) == null &&
      tagName !== '' &&
      !tags.some(t => t.name === tagName)
    )
  }
  const generateNewTags = (inputValue: string, tags: Tag[]) => {
    const lastId = tags.length > 0 ? tags[tags.length - 1].id : 0
    const newTags = inputValue
      .split(DELIMITERS)
      .filter(tagName => isValidNewTag(tagName, tags))
      .map((tagName, index) => {
        return { id: lastId + index + 1, name: tagName, isSaved: false }
      })
    return [...tags, ...newTags]
  }
  const resetSuggestTimer = (callBack: () => void, ms: number) => {
    if (suggestTimer) {
      clearTimeout(suggestTimer)
      setSuggestTimer(null)
    }
    setSuggestTimer(setTimeout(callBack, ms))
  }
  const fetchSuggestions = async (inputValue: string) => {
    try {
      return await tagService.getTagsByPrefix(inputValue)
    } catch {
      console.error('Failed to fetch tag suggestions')
      return []
    }
  }

  interface setStatesProps {
    newTextValue: string
    newTags: Tag[]
    newTagSuggestions: Tag[]
  }

  const setStates = ({
    newTextValue,
    newTags,
    newTagSuggestions,
  }: setStatesProps) => {
    setTextValue(newTextValue)
    setTags(newTags)
    setTagSuggestions(newTagSuggestions)
  }

  // Event handlers
  // chip event handlers
  const handleChipDelete = (tag: Tag) => {
    const newTags = tags.filter(t => t.id !== tag.id)
    setTags(newTags)
  }
  const handleChipClick = () => {}
  // input event handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (!inputValue) {
      setStates({
        newTextValue: '',
        newTags: tags,
        newTagSuggestions: [],
      })
      resetSuggestTimer(() => {}, 0)
    } else if (hasDelimiter(inputValue)) {
      setStates({
        newTextValue: '',
        newTags: generateNewTags(inputValue, tags),
        newTagSuggestions: [],
      })
      resetSuggestTimer(() => {}, 0)
    } else {
      setStates({
        newTextValue: inputValue,
        newTags: tags,
        newTagSuggestions: [],
      })
      resetSuggestTimer(async () => {
        const suggestions = await fetchSuggestions(inputValue)
        setTagSuggestions(suggestions)
      }, 500)
    }
  }

  // Return values
  return {
    textValue,
    tags,
    tagSuggestions,
    handleChange,
    handleChipDelete,
    handleChipClick,
  }
}
