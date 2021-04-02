// コンポーネント読み込む
import SearchBook from '../pages/SearchBook.svelte'
import DetailsBook from '../pages/DetailsBook.svelte'
// ルーティング
// Appで読み込む
export const routes = {
  '/': SearchBook,
  '/books/:id': DetailsBook,
}