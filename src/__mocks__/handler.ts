import { http, HttpResponse } from 'msw'

// Define the type for the handler array
export const handlers = [
  http.get('/api/login', ({request,params}) => {
    const message = 'Welcome'
    return HttpResponse.json(message, { status: 201 })
  }),
];
