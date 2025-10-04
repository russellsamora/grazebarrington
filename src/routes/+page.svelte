<script>
	import { setContext } from "svelte";
	import { browser } from "$app/environment";
	import Meta from "$components/Meta.svelte";
	import Index from "$components/Index.svelte";
	import version from "$utils/version.js";

	let { data } = $props();

	version();

	const title = "graze barrington";
	const description =
		"trying the most popular item at every food establishment in great barrington";
	const url = "https://grazebarrington.com";
	const keywords = "great barrington, food, eating, massachusetts, ma";
	setContext("data", data);
</script>

<Meta {title} {description} {url} {keywords} />
<Index />
