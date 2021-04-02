<script lang="ts">
	// Rowコンポーネントの属性として使えるようにする
	export let dt: string;
</script>

<!-- ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー -->

<div
	class="bg-gray-50 border-b border-gray-200 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
>
	<dt class="text-sm font-medium text-gray-500">
		{dt}
	</dt>
	<dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
		<!-- {chirdren}みたいなやつ、Rowコンポーネントが囲ってるデータを表示 -->
		<!-- どこで{chirdren}を受け取るかを指定できる -->
		<slot />
	</dd>
</div>
