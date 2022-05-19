import React, { useContext, useEffect } from 'react'
import { Input, Button } from '../../components'
import { AppContext } from '../../context/Context'
import { env } from '../../../config/env'
import axios from 'axios'
import './form-styles.scss'

const Form: React.FC = () => {
  const { data, setData, setActiveBox } = useContext(AppContext)
  const { height, width, door, window } = data

  const handleReset = async (): Promise<void> => {
    await axios.delete(`${env.url}/reset`)
  }

  useEffect(() => {
    handleReset()
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      setData({
        ...data
      })
      const http = await axios.post(env.url, {
        height,
        width,
        door,
        window
      })
      if (http.data.statusCode === 400) {
        alert(http.data.body)
      } else {
        setActiveBox(true)
      }
    } catch (error) {
      console.log(error)
    }

    (document.getElementById('height') as HTMLInputElement).value = '';
    (document.getElementById('width') as HTMLInputElement).value = '';
    (document.getElementById('door') as HTMLInputElement).value = '';
    (document.getElementById('window') as HTMLInputElement).value = ''
  }
  return (
    <form action="" onSubmit={handleSubmit}>
      <Input props={{ name: 'height', id: 'height' }} placeholder='Digite a altura da parede (em cm)' />
      <Input props={{ name: 'width', id: 'width' }} placeholder='Digite a largura da parede (em cm)' />
      <Input props={{ name: 'door', id: 'door' }} placeholder='Digite a quantidade de portas' />
      <Input props={{ name: 'window', id: 'window' }} placeholder='Digite a quantidade de janela' />
      <Button title='Register' />
    </form>
  )
}

export default Form