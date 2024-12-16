import React from 'react'
import { Tag, TagWithUUID } from '../../../../types/diaryApp'
import { TagServiceI } from '../API/tagServiceI'
import { createUUID } from '../../../util/uniqueKey'

export const useTagField = (
  defaultTags: TagWithUUID[],
  defaultInputValue: string,
  tagService: TagServiceI
) => {
  // Constants
  const DELIMITERS = /[ 　\t\n]/g
  // State
  const [textValue, setTextValue] = React.useState<string>(defaultInputValue)
  const [tags, setTags] = React.useState<TagWithUUID[]>(defaultTags)
  const [suggestTimer, setSuggestTimer] = React.useState<NodeJS.Timeout | null>(
    null
  )
  const [tagSuggestions, setTagSuggestions] = React.useState<Tag[]>([])
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
  const generateNewTags = (inputValue: string, tags: TagWithUUID[]) => {
    const lastId = tags.length > 0 ? tags[tags.length - 1].id : 0
    const newTags = inputValue
      .split(DELIMITERS)
      .filter(tagName => isValidNewTag(tagName, tags))
      .map((tagName, index) => {
        return {
          id: undefined,
          name: tagName,
          isSaved: false,
          uuid: createUUID(),
        }
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
    newTags: TagWithUUID[]
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

  // View
  // useEffect
  React.useEffect(() => {
    setStates({
      newTextValue: defaultInputValue,
      newTags: defaultTags,
      newTagSuggestions: [],
    })
    resetSuggestTimer(() => {}, 0)
  }, [defaultTags, defaultInputValue])
  // Event
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
