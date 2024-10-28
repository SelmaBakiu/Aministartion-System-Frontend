import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
})

AxiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
        console.log(
            'Authorization header:',
            config.headers['Authorization'],
        )
      }
      return config
    },
    (error) => Promise.reject(error),
)

export default AxiosInstance