import type { BookItemType, BookRepositoryInterface, ParamsType, ResultType } from './types'
import { httpClient } from '../httpClient'

// const httpClient = axios.create({
//   baseURL: 'https://www.googleapis.com/books/v1/volumes'
// })


// implements の使い方
// https://qiita.com/nogson/items/86b47ee6947f505f6a7b#%E4%BD%BF%E3%81%84%E6%96%B9
export class BookRepository implements BookRepositoryInterface { // ①
  

  // interface ParamsType { 
  //   q: string; 
  //   startIndex?: number;
  // }

  // ParamsType型で受け取る
  async get(params: ParamsType) { // ①❶
    // Axios通信でWEBAPIを取得する
    // pathに応じたデータを取得（クエリー）
    const { data } = await httpClient.get<ResultType>('/', { params })
    return data
  }
  

  // string型で受け取る
  async find(id: string) { // ①❷
    // Axios通信でWEBAPIを取得する
    // pathに応じたデータを取得（クエリー）
    const { data } = await httpClient.get<BookItemType>(`/${id}`)
    return data
  }
}