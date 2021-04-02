import axios from 'axios'

// AxiosでWEBAPIを叩く
export　const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes'
})
