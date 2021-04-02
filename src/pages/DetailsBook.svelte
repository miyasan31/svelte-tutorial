<script lang="ts">
	import BookInfo from "../components/BookInfo.svelte"; // 本情報のコンポーネント
	import Spinner from "../components/Spinner.svelte"; // ローディングアイコン
	// RepositoryFactory モジュール
	import RepositoryFactory, { BOOK } from "../repositories/RepositoryFactory";
	import type { BookItemType } from "../repositories/book"; // 本の情報型定義
	import type { Readable } from "svelte/store"; //Svelteの状態管理
	import { find, books } from "../store/book"; // storeの値

	// BOOK = 'book'キー
	// RepositoryFactoryはファイル名かな？　だとしたらモジュール？？？
	const BookRepository = RepositoryFactory[BOOK]; // ①
	// ParamsTypeにid追加
	type ParamsType = { id: string };
	// paramsの型定義bind
	export let params: ParamsType;
	// Readableを設定することでstoreから値の取得ができる
	let book: Readable<BookItemType>;
	// promiseの型定義bind
	// void型は関数の値をreturnしない
	let promise: Promise<void>;

	const findById = async (id: string) => {
		// 本のidを検索するAPIを叩く
		const book_id = await BookRepository.find(id); // ①❷
		// storeに格納する（状態管理できるようにする）
		return books.add([book_id]); // ②❷
	};
	// params.id が確実に store に存在するか？
	book = find(params.id); // ③
	if (!$book) {
		// promise = books_id
		promise = findById(params.id);
	}
</script>

<!-- ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->

<div>
	<!-- 非同期処理 -->
	{#await promise}
		<!-- pending 未完了 -->
		<div class="flex justify-center">
			<Spinner />
		</div>
	{:then}
		<!-- fullfilled 完了 -->
		<BookInfo book={$book} />
	{:catch e}
		<!-- reject エラー -->
		<span class="text-red-600 text-sm">
			{e.message}
		</span>
	{/await}
</div>
