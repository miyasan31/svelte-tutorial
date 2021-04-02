<script lang="ts">
	import { link } from "svelte-spa-router"; // ReactのLinkみたいなやつ
	import type { BookItemType } from "../repositories/book"; // 本情報の型定義
	export let book: BookItemType; // bookの型定義bind

	// イメージがあれば本のサムネイル表示、なければNoImage
	$: src = book.volumeInfo.imageLinks
		? book.volumeInfo.imageLinks.smallThumbnail
		: "http://placehold.jp/eeeeee/cccccc/160x120.png?text=No%20Image";
	// あらすじがあれば100文字だけ表示、なければ空文字
	$: description = book.volumeInfo.description
		? `${book.volumeInfo.description.slice(0, 100)}...`
		: "";
</script>

<!-- ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->

<div class="w-full sm:flex">
	<div
		class="h-96 sm:h-auto sm:w-48 flex-none bg-cover rounded-t sm:rounded-t-none sm:rounded-l text-center overflow-hidden"
		style={`background-image: url('${src}')`}
	/>
	<div
		class="border-r border-b border-l border-grey-light sm:border-l-0 sm:border-t sm:border-grey-light bg-white rounded-b sm:rounded-b-none sm:rounded-r p-4 flex flex-col justify-between leading-normal w-100 sm:w-9/12 lg:w-7/12"
	>
		<div class="my-4">
			<!-- タイトルをクリックするとlinkを使って画面遷移 -->
			<a href={`/books/${book.id}`} use:link>
				<div class="text-black font-bold text-xl mb-2">
					{book.volumeInfo.title}
				</div>
			</a>
			<p class="text-grey-darker text-sm break-words w-9/12 m-auto">
				{description}
			</p>
		</div>
	</div>
</div>
