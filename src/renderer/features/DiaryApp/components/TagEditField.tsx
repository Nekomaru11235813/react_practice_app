import { Box, Chip, InputBase, TextField } from '@mui/material'
import React, { useCallback, useEffect } from 'react'

export interface TagEditFieldProps {}

export const TagEditField: React.FC<TagEditFieldProps> = () => {
  const handleDelete = () => {}
  const handleClick = () => {}

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
        <Chip label='タグ1' onClick={handleClick} onDelete={handleDelete} />
        <Chip label='タグ1' onClick={handleClick} onDelete={handleDelete} />
        <Chip label='タグ1' onClick={handleClick} onDelete={handleDelete} />
      </Box>
      <InputBase placeholder='タグを追加' />
    </Box>
  )
}
