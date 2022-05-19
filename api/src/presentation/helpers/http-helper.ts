import { HttpResponse } from '../protocols/http'

export const badRequest = (warning: string): HttpResponse => ({ 
  statusCode: 400,
  body: warning
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
