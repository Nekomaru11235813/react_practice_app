import React, { useState } from 'react'
import { Button } from '@mui/material'

export default function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true)
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''))
  const [status, setStatus] = useState<string>('Next player: X')

  return (
    <div>
      <div>{status}</div>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )

  function handleClick(i: number): void {
    if (squares[i] || calculateWinner(squares)) {
      return
    }

    const nextSquares = squares.slice()
    nextSquares[i] = xIsNext ? 'X' : 'O'
    setSquares(nextSquares)
    setXIsNext(!xIsNext)
    setStatus(calculateStatus(calculateWinner(nextSquares), !xIsNext))
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
