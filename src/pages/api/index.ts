import { createAPIClient } from '@/utils/request.utils'

export const api = createAPIClient('http://127.0.0.1:3000/api', 5000, 300);


export default api;