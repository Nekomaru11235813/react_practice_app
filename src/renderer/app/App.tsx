// src/App.tsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import HelloWorld from '../features/HelloWorld/HelloWorld'
import '../styles.css' // スタイルが必要であればインポートします
import SurvivalTypeScriptContainer from '../features/SurvivalTypeScript/SurvivalTypeScript'
import TicTacToe from '../features/TicTacToe/TicTacToe'
import { Tab, Box } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState(1)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  return (
    <TabContext value={currentTab}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label='simple tabs example'>
          <Tab label='Item One' value='1' />
          <Tab label='Item Two' value='2' />
          <Tab label='Item Three' value='3' />
          <Tab label='Item Four' value='4' />
        </TabList>
      </Box>
      <TabPanel value='1'>
        <div className='bg-blue-500 text-white p-4 max-w-sm mx-auto mt-20'>
          <h1 className='text-4xl font-bold'>Hello from React and Tailwind!</h1>
          <p className='mt-2 text-lg'>
            This is a simple example showing Tailwind CSS with React.
          </p>
        </div>
      </TabPanel>
      <TabPanel value='2'>
        <div>
          <Provider store={store}>
            <HelloWorld />
          </Provider>
        </div>
      </TabPanel>
      <TabPanel value='3'>
        <div>
          <SurvivalTypeScriptContainer />
        </div>
      </TabPanel>
      <TabPanel value='4'>
        <div>
          <TicTacToe />
        </div>
      </TabPanel>
    </TabContext>
  )
}

export default App
