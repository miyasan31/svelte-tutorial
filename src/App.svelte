<script lang="ts">
	import Tailwindcss from "./Tailwindcss.svelte";
	import Header from "./components/Header.svelte";
	import Router from "svelte-spa-router";
	import { routes } from "./router";
</script>

<!-- 
<style global>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style> 
-->
<!-- 下と同じ -->
<Tailwindcss />

<Header />
<main class="pt-16">
	<div class="container mx-auto px-6 my-4">
		<!-- routerからルーティングファイルを読み込む -->
		<Router {routes} />
	</div>
</main>
