import { Box, InputBase } from '@mui/material'
import React from 'react'
import { TagChip } from './TagChip'
import { Tag } from '../../../../types/diaryApp'
import { container } from 'tsyringe'
import { TagServiceI } from '../API/tagServiceI'
import { useTagField } from '../hooks/useTagField'

export interface TagEditFieldProps {}

const defaultTags: Tag[] = [
  { id: 1, name: 'タグ1', isSaved: true },
  { id: 2, name: 'タグ2', isSaved: true },
  { id: 3, name: 'タグ3', isSaved: true },
]

export const TagEditField: React.FC<TagEditFieldProps> = () => {
  const tagService = container.resolve<TagServiceI>('tagService')
  const { textValue, tags, handleChange, handleChipClick, handleChipDelete } =
    useTagField(defaultTags, '', tagService)
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
