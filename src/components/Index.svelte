<script>
	import { getContext } from "svelte";
	import { format, ascending, descending } from "d3";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import ArrowDownAZ from "@lucide/svelte/icons/arrow-down-a-z";
	const data = getContext("data");

	let places = $state(data.places);

	function sortAlpha() {
		places.sort((a, b) => ascending(a.name, b.name));
		places = [...places];
	}

	function sortDate() {
		places.sort((a, b) => descending(a.date, b.date));
		places = [...places];
	}
</script>

<header>
	<img src="assets/logo.png" alt="graze barrington logo" />

	<h1>graze barrington</h1>

	<p>
		trying the most popular item at every food establishment in great barrington
	</p>
	<details>
		<summary>about</summary>
		<p>to qualify, a place must:</p>
		<ul>
			<li>sell to the public</li>
			<li>prepare food on site</li>
			<li>offer a savory meal</li>
		</ul>
		<p>at the time of writing, this yields approximately 75 places in town.</p>
	</details>
</header>

<div class="ui">
	<button onclick={sortDate}>
		<CalendarDays /> sort by newest
	</button>
	<button onclick={sortAlpha}>
		<ArrowDownAZ /> sort by name
	</button>
</div>
<section id="places">
	{#each places as p (p.name)}
		{@const img = p.name.replace(/\W/g, "").toLowerCase()}
		{@const src = `assets/${img}@2x.jpg`}
		{@const price = format("$,.2f")(p.cost)}
		{@const hide = !!p.hide}
		<div class="place" class:hide>
			<h2>
				{p.name}{#if p.name_note}<span>{p.name_note}</span>{/if}
			</h2>
			<img {src} alt={p.item} />
			<p class="item">
				<strong>{p.item}</strong>
				<span class="price">{price}</span>
			</p>
			{#if p.notes}
				<p class="notes">
					{p.notes}
				</p>
			{/if}
			<p class="return"><strong>return visit?</strong> {p.return}</p>
		</div>
	{/each}
</section>

<style>
	header {
		max-width: var(--col-width);
		margin: 0 auto;
	}

	header img {
		max-width: 256px;
	}

	h1 {
		margin: 0 auto;
		text-align: center;
	}

	section {
		max-width: var(--col-width);
		margin: 0 auto;
	}

	.place {
		padding-bottom: 16px;
		margin-bottom: 48px;
		margin-top: 32px;
		border-bottom: 1px dashed var(--color-border);
	}

	.hide {
		display: none;
	}

	h2 {
		line-height: 1.2;
		text-transform: lowercase;
	}

	h2 span {
		font-size: 0.75em;
		display: block;
		color: var(--color-gray-600);
	}

	p {
		margin: 8px auto;
	}

	p span {
		color: var(--color-gray-600);
	}

	img {
		margin: 16px auto;
	}

	details {
		cursor: pointer;
	}

	summary {
		color: var(--color-gray-600);
	}

	.ui {
		display: flex;
		gap: 8px;
		margin: 32px auto;
		max-width: var(--col-width);
	}

	button {
		display: flex;
		align-items: center;
		font-size: 14px;
		flex: 1;
		border: 1px solid var(--color-border);
		justify-content: center;
	}

	:global(.ui button svg) {
		width: 1.5em;
		margin-right: 8px;
	}
</style>
