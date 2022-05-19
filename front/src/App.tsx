import React from 'react'
import AppProvider from './presentation/context/Context'
import View from './presentation/view/view'
import './styles/global.scss'

function App (): any {
  return (
    <>
      <AppProvider>
        <View />
      </AppProvider>
    </>
  )
}

export default App