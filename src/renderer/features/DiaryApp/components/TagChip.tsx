import React from 'react'
import { Chip } from '@mui/material'
import { Tag } from './TagEditField'

export interface TagChipProps {
  tag: Tag
  onDelete: () => void
  onClick: () => void
}

export const TagChip: React.FC<TagChipProps> = ({
  tag,
  onDelete,
  onClick,
}: TagChipProps) => {
  return <Chip label={'# ' + tag.name} onClick={onClick} onDelete={onDelete} />
}
