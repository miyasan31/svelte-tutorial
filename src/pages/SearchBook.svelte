<script lang="ts">
	import InfiniteScroll from "svelte-infinite-scroll"; // スクロール検知ライブラリ
	import SearchBar from "../components/SearchBar.svelte"; // 検索バー
	import Spinner from "../components/Spinner.svelte"; // ローディングアイコン
	import BookCard from "../components/BookCard.svelte"; // 本一覧のカード
	// RepositoryFactory モジュール
	import RepositoryFactory, { BOOK } from "../repositories/RepositoryFactory";
	import { books } from "../store/book"; // store の books を参照

	const BookRepository = RepositoryFactory[BOOK];
	// クエリーパラメータ 検索する文字
	let q = "";
	// 検索ヒットフラグ
	let empty = false;
	// promiseの型定義bind
	// void型は関数の値をreturnしない
	let promise: Promise<void>;
	// 検索ヒット数
	let totalItems = 0;
	// 検索開始位置
	let startIndex = 0;
	$: hasMore = totalItems > $books.length;
	// 検索イベントハンドラ getbooks() を実行
	const handleSubmit = () => {
		if (!q.trim()) return;
		promise = getbooks();
	};
	// 本一覧情報を取得
	const getbooks = async () => {
		// store をリフレッシュして空にする
		books.reset(); // ②❶
		// フロント側の状態もリフレッシュして空にする
		empty = false;
		// 検索毎に index0 から検索
		startIndex = 0;
		const result = await BookRepository.get({ q, startIndex }); // ①❶
		// 検索ヒットフラグ　empty
		empty = result.totalItems === 0;
		// 検索ヒット数代入
		totalItems = result.totalItems;
		// store に保存する
		books.add(result.items); // ②❷
	};
	// 読み込みイベントハンドラ getNextPage() を実行
	const handleLoadMore = () => {
		// 10件読み込み
		startIndex += 10;
		// 非同期モード開始
		promise = getNextPage();
	};
	// イベントハンドラにより次のページを読み込む
	const getNextPage = async () => {
		// 追加で読み込むときは startIndex の数が開始位置
		const result = await BookRepository.get({ q, startIndex }); // ①❶
		// 取得データが既に存在するものを含む可能性があるので、フィルタリングしてます。
		const bookIds = $books.map((book) => book.id);
		const filteredItems = result.items.filter((item) => {
			return !bookIds.includes(item.id);
		});
		// store に追加保存する
		books.add(filteredItems); // ②❷
	};
</script>

<!-- ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->
<!-- 検索バー -->
<form on:submit|preventDefault={handleSubmit}>
	<SearchBar bind:value={q} />
</form>

<!-- 本一覧を表示 -->
<div class="text-center mt-4">
	{#if empty}
		<div>検索結果が見つかりませんでした。</div>
	{:else}
		<!-- 検索ヒットした時の表示 -->
		<div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
			<!--　each ループ処理 -->
			{#each $books as book}
				<BookCard {book} />
			{/each}
		</div>
		<InfiniteScroll
			window
			threshold={100}
			on:loadMore={handleLoadMore}
			{hasMore}
		/>
	{/if}
	<!-- pending 未完了 -->
	{#await promise}
		<div class="flex justify-center">
			<Spinner />
		</div>
	{:catch e}
		<!-- reject エラー -->
		<span class="text-red-600 text-sm">
			{e.message}
		</span>
	{/await}
</div>
