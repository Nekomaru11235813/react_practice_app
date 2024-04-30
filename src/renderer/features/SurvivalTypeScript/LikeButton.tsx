import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, {useState} from 'react';
import { Button } from '@mui/material';

export default function LikeButton() {
  const [count, setCount] = useState(999);
  const handleClick = () => {
    setCount(count + 1);
  }
  return (
    <Button
      variant="contained"
      className="bg-red-500 text-white hover:bg-red-600"
      startIcon={<FavoriteBorderIcon />}
      onClick={handleClick}
    >
      {count}
    </Button>
  )
  
}