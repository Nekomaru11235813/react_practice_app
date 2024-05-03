import React, { useState } from 'react'
import { Button, List, ListItem, ListItemText } from '@mui/material'

interface GameProps {}

const Game: React.FC<GameProps> = () => {
  const [history, setHistory] = useState<string[][]>([Array(9).fill('')])
  const currentSquares = history[history.length - 1]
  const [status, setStatus] = useState<string>('Next player: X')
  const currentMove = history.length - 1
  const xIsNext = currentMove % 2 === 0

  const moves: React.JSX.Element[] = history.map(
    (step: string[], move: number) => {
      let description = move > 0 ? `Go to move #${move}` : 'Go to game start'
      return (
        <ListItem key={move}>
          <ListItemText>{move + 1}. </ListItemText>
          <Button
            variant='contained'
            onClick={() => jumpTo(move)}
            sx={{ padding: '0' }}
            className='w-full text-left px-2 py-1'
          >
            {description}
          </Button>
        </ListItem>
      )
    }
  )

  return (
    <div className='flex justify-start items-start space-x-4'>
      <div className='game-board'>
        <Board
          squares={currentSquares}
          onPlay={i => handleClick(i, currentSquares)}
        />
      </div>
      <div className='game-info'>
        <div>{status}</div>
        <List component='nav' aria-label='main mailbox folders'>
          {moves}
        </List>
      </div>
    </div>
  )

  function handleClick(i: number, squares: string[]): void {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setHistory(history.concat([nextSquares]))
    setStatus(calculateStatus(calculateWinner(nextSquares), !xIsNext))
  }

  function jumpTo(move: number): void {
    setHistory(history.slice(0, move + 1))
    setStatus(calculateStatus(calculateWinner(history[move]), move % 2 === 0))
  }

  function calculateStatus(
    winner: string | undefined,
    xIsNext: boolean
  ): string {
    if (winner) {
      return `Winner: ${winner}`
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`
    }
  }

  function calculateWinner(squares: string[]): string | undefined {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    const resultLine: number[] | undefined = lines.find(line => {
      const [a, b, c] = line
      return (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      )
    })
    return resultLine ? squares[resultLine[0]] : undefined
  }
}

interface BoardProps {
  squares: string[]
  onPlay: (i: number, squares: string[]) => void
}

const Board: React.FC<BoardProps> = ({ squares, onPlay }) => {
  return (
    <div>
      <div>
        <Square value={squares[0]} onSquareClick={() => onPlay(0, squares)} />
        <Square value={squares[1]} onSquareClick={() => onPlay(1, squares)} />
        <Square value={squares[2]} onSquareClick={() => onPlay(2, squares)} />
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => onPlay(3, squares)} />
        <Square value={squares[4]} onSquareClick={() => onPlay(4, squares)} />
        <Square value={squares[5]} onSquareClick={() => onPlay(5, squares)} />
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => onPlay(6, squares)} />
        <Square value={squares[7]} onSquareClick={() => onPlay(7, squares)} />
        <Square value={squares[8]} onSquareClick={() => onPlay(8, squares)} />
      </div>
    </div>
  )
}

interface SquareProps {
  value: string
  onSquareClick?: () => void
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <Button
      className='rounded-none w-16 h-16'
      variant='outlined'
      onClick={onSquareClick}
    >
      {value}
    </Button>
  )
}

export default Game
