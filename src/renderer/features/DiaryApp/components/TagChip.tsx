import React from 'react'
import { Chip } from '@mui/material'
import { TagWithUUID } from '../../../../types/diaryApp'

export interface TagChipProps {
  tag: TagWithUUID
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
