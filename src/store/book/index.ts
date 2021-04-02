import { writable, derived } from 'svelte/store'
import type { BookItemType } from '../../repositories/book'

// 状態管理 Store
const useBookStore = () => {
  const { subscribe, set, update } = writable<BookItemType[]>([])
  const reset = () => set([])　// ②❶
  const add = (newBooks: BookItemType[]) => update((books: BookItemType[]) => {
    return [...books, ...newBooks]
  })// ②❷
  
  return { 
    subscribe, 
    reset, // store リセット関数
    add // store 追加関数
  }
}

export const books = useBookStore() // ②

//  store を派生させる？？？ books の拡張版かな？？？
// return books: BookItemType[]
export const find = (id: string) => { // ③
  return derived(books, $books => $books.find(book => book.id === id))}