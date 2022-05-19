import React, { useContext } from 'react'
import { AppContext } from '../../context/Context'
import './button-styles.scss'

type Props = {
  title: string
}

const Button: React.FC<Props> = ({ title }: Props) => {
  const { state } = useContext(AppContext)
  return (
    <button className='Button' disabled={state.length >= 4} type='submit'>{ title }</button>
  )
}

export default Button