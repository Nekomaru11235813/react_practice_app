// src/features/HelloWorld/HelloWorld.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { toggleMessage } from './HelloSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.primary, // custom MUI theme color or direct hex value
  padding: theme.spacing(2),
  maxWidth: 400,
  margin: `${theme.spacing(5)} auto`,
  textAlign: 'center',
  // color: theme.palette.primary,
}));

const HelloWorld: React.FC = () => {
  const message = useSelector((state: RootState) => state.hello.message);
  const dispatch = useDispatch();

  // return (
  //   <div className="bg-blue-500 text-white p-4 max-w-sm mx-auto mt-20 shadow-lg rounded">
  //   <h1 className="text-4xl font-bold">{message}</h1>
  //   <button
  //     className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
  //     onClick={() => dispatch(toggleMessage())}
  //   >
  //     Toggle Message
  //   </button>
  // </div>
  // );

  return (
      <StyledPaper elevation={4} className="shadow-xl rounded-lg">
        <Typography variant="h4" component="h1" gutterBottom>
          {message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(toggleMessage())}
          className="mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
        >
          Toggle Message
        </Button>
      </StyledPaper>
    );
}

export default HelloWorld;
