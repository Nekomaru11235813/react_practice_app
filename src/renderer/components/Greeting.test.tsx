// src/components/Greeting.test.tsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Greeting from './Greeting'

describe('Greeting Component', () => {
  test('displays the correct greeting message', () => {
    render(<Greeting name='John' />)
    const greetingElement = screen.getByText('Hello, John!')
    expect(greetingElement).toBeInTheDocument()
  })
})
