import React, { createContext, ReactNode, SetStateAction, useState } from 'react'

interface contextData {
  setData: React.Dispatch<SetStateAction<any>>
  setActiveBox: React.Dispatch<SetStateAction<boolean>>
  setState: React.Dispatch<SetStateAction<any>>
  state: []
  activeBox: boolean
  data: {
    height: number
    width: number
    door: number
    window: number
  }
}

interface ContextProvider {
  children: ReactNode
}

export const AppContext = createContext({ } as contextData)

export default function AppProvider ({ children }: ContextProvider): any {
  const [activeBox, setActiveBox] = useState<boolean>(false)
  const [state, setState] = useState<any>([])
  const [data, setData] = useState({
    height: 0,
    width: 0,
    door: 0,
    window: 0
  })

  return (
    <AppContext.Provider value={{ state, activeBox, data, setState, setData, setActiveBox }}>
      {children}
    </AppContext.Provider>
  )
}