
import { BookRepository, BookRepositoryInterface } from './book'

export const BOOK = Symbol('book')

export default {
  [BOOK]: new BookRepository() // ①
} as Repositories

export interface Repositories {
  [BOOK]: BookRepositoryInterface;
}
