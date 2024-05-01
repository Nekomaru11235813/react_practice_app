// src/App.tsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import HelloWorld from '../features/HelloWorld/HelloWorld'
import '../styles.css' // スタイルが必要であればインポートします
import SurvivalTypeScriptContainer from '../features/SurvivalTypeScript/SurvivalTypeScript'
import TicTacToe from '../features/TicTacToe/TicTacToe'

const App: React.FC = () => {
  return (
    <div>
      {/* <div className='bg-blue-500 text-white p-4 max-w-sm mx-auto mt-20'>
        <h1 className='text-4xl font-bold'>Hello from React and Tailwind!</h1>
        <p className='mt-2 text-lg'>
          This is a simple example showing Tailwind CSS with React.
        </p>
      </div> */}
      <div>
        <Provider store={store}>
          <HelloWorld />
        </Provider>
      </div>
      <div>
        <SurvivalTypeScriptContainer />
        <TicTacToe />
      </div>
    </div>
  )
}

export default App
