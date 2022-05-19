import React, { useContext } from 'react'
import { AppContext } from '../../context/Context'
import './input-styles.scss'

type Props = {
  placeholder: string
  props: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const Input: React.FC<Props> = ({ placeholder, props }: Props) => {
  const { data, setData } = useContext<any>(AppContext)
  
  return (
    <input
      {...props}
      type="number"
      placeholder={ placeholder }
      onChange={e => {
        setData({ ...data, [e.target.name]: [e.target.value] })
      }}
    />
  )
}

export default Input