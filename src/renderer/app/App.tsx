// src/App.tsx
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import HelloWorld from '../features/HelloWorld/HelloWorld'
import '../styles.css' // スタイルが必要であればインポートします
import SurvivalTypeScriptContainer from '../features/SurvivalTypeScript/SurvivalTypeScript'
import TicTacToe from '../features/TicTacToe/TicTacToe'
import { Tab, Box, AppBar, Divider, Stack } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import InputField from '../features/InputField/InputField'
import DiaryApp from '../features/DiaryApp/DiaryApp'

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState<string>('1')

  const contentsList = [
    { label: 'HelloWorld', content: <HelloReact /> },
    {
      label: 'Toggle HelloWorld',
      content: (
        <Provider store={store}>
          <HelloWorld />
        </Provider>
      ),
    },
    { label: 'Good Button', content: <SurvivalTypeScriptContainer /> },
    { label: 'TicTacToe', content: <TicTacToe /> },
    { label: 'Input Field', content: <InputField /> },
    { label: 'DiaryApp', content: <DiaryApp /> },
  ]

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue)
  }

  return (
    <TabContext value={currentTab}>
      <Stack>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider', overflowX: 'auto' }}
        >
          <TabList
            onChange={handleChange}
            aria-label='simple tabs example'
            variant='scrollable'
          >
            {contentsList.map((content, index) => (
              <Tab
                key={index}
                label={content.label}
                value={(index + 1).toString()}
              />
            ))}
          </TabList>
        </Box>
        <Divider />
        {contentsList.map((content, index) => (
          <TabPanel key={index} value={(index + 1).toString()}>
            {content.content}
          </TabPanel>
        ))}
      </Stack>
    </TabContext>
  )
}

export default App

const HelloReact = () => {
  return (
    <div className='bg-blue-500 text-white p-4 max-w-sm mx-auto mt-20'>
      <h1 className='text-4xl font-bold'>Hello from React and Tailwind!</h1>
      <p className='mt-2 text-lg'>
        This is a simple example showing Tailwind CSS with React.
      </p>
    </div>
  )
}
