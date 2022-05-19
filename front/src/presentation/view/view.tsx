import React, { useContext, useEffect, useState } from 'react'
import { Form, Box } from '../components'
import { AppContext } from '../context/Context'
import './view-styles.scss'

const View: React.FC = () => {
  const { activeBox } = useContext(AppContext)
  return (
    <div className="content">
      <div className="paragraph">
        <h1>Digital Calculator</h1>
        <span>
          Welcome, to the calculator that calculates the exact amount of liters of paint you need.
          <p>Developed in code challenge of enterprise Digital Republic!</p>
        </span>
      </div>
      <div className="container">
        <Form />
        {activeBox ? (<Box />) : null}
        
      </div>
    </div>
  )
}

export default View