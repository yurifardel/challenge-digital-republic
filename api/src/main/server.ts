import express, { Express } from 'express'
import bodyParse from 'body-parser'
import Cors from 'cors'
import rest from '../middleware/apis/api'
import env from './config/env'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(Cors())
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.use(rest)

app.listen(env.port, () => {
  console.log(`⚡️[server]: express listen on port ${env.port}`)
})
