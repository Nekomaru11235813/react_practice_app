import { Box, InputBase } from '@mui/material'
import React from 'react'
import { TagChip } from './TagChip'
import { TagWithUUID } from '../../../../types/diaryApp'
import { container } from 'tsyringe'
import { TagServiceI } from '../API/tagServiceI'
import { useTagField } from '../hooks/useTagField'

export interface TagEditFieldProps {
  tags: TagWithUUID[]
}

export const TagEditField: React.FC<TagEditFieldProps> = ({
  tags: inputTags,
}: TagEditFieldProps) => {
  const tagService = container.resolve<TagServiceI>('tagService')
  const {
    textValue,
    tags: resultTags,
    handleChange,
    handleChipClick,
    handleChipDelete,
  } = useTagField(inputTags, '', tagService)
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
        {resultTags.map(tag => {
          return (
            <TagChip
              key={tag.uuid}
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
