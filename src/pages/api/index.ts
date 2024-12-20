import { createAPIClient } from '@/utils/api-request.utils'

export const api = createAPIClient('http://localhost:3000/api', 5000, 300);


export default api;