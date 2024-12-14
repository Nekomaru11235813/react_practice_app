import { Box, InputBase } from '@mui/material'
import React from 'react'
import { TagChip } from './TagChip'

export interface TagEditFieldProps {}

export type Tag = {
  id: number
  name: string
  isSaved: boolean
}

const defaultTags: Tag[] = [
  { id: 1, name: 'タグ1', isSaved: true },
  { id: 2, name: 'タグ2', isSaved: true },
  { id: 3, name: 'タグ3', isSaved: true },
]

export const TagEditField: React.FC<TagEditFieldProps> = () => {
  const [textValue, setTextValue] = React.useState<string>('')
  const [tags, setTags] = React.useState<Tag[]>(defaultTags)

  const handleChipDelete = (tag: Tag) => {
    const newTags = tags.filter(t => t.id !== tag.id)
    setTags(newTags)
  }
  const handleChipClick = () => {}
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (hasDelimiter(inputValue)) {
      const lastId = tags.length > 0 ? tags[tags.length - 1].id : 0
      const newTags = inputValue
        .split(delimiters)
        .filter(tagName => isValidNewTag(tagName, tags))
        .map((tagName, index) => {
          return { id: lastId + index + 1, name: tagName, isSaved: false }
        })
      console.log(newTags)
      setTags([...tags, ...newTags])
      setTextValue('')
    } else {
      setTextValue(e.target.value)
    }
  }

  return (
    <Box
      display={'flex'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 0.5,
        padding: 1,
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    >
      <Box>
        {tags.map(tag => {
          return (
            <TagChip
              key={tag.id}
              tag={tag}
              onClick={handleChipClick}
              onDelete={() => handleChipDelete(tag)}
            />
          )
        })}
      </Box>
      <InputBase
        placeholder='タグを追加'
        onChange={handleChange}
        value={textValue}
      />
    </Box>
  )
}
