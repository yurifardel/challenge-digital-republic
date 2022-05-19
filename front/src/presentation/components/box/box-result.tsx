import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/Context'
import { env } from '../../../config/env'
import { Props } from '../../../domain/models/model'
import axios from 'axios'
import './box-result-styles.scss'

const Box: React.FC = () => {
  const { data, state, setState } = useContext(AppContext)
  const [result, setResult] = useState('')
  const [activeResult, setActiveResult] = useState<boolean>(false)

  const handleCalcule = async (): Promise<void> => {
    const http = await axios.get(`${env.url}/result`)
    setResult(http.data.body)
    setActiveResult(true)
  }

  const handleData = async (): Promise<void> => {
    const http = await axios.get(env.url)
    setState(http.data.body)
  }

  useEffect(() => {
    handleData()
  }, [data])

  return (
    <div className='boxContainer'>
      <div className="box">
        {state.map((itens: Props, index) => {
          return (
            <div key={index} className='paredes'>
              <h1>Parede {index + 1} - Altura: {itens.height}m, Largura: {itens.width}m</h1>
              <h1>Quantidade de Portas: {itens.door}</h1>
              <h1>Quantidade de Janelas: {itens.window}</h1>
            </div>
          )
        })}
        {activeResult ? (<p className='results'>Resultado: {result}</p>) : null}
        
      </div>
      <button onClick={handleCalcule} className='buttonCalculator'>Calcular</button>
    </div>
  )
}

export default Box