<script>
	import { getContext } from "svelte";
	import { format, ascending, descending } from "d3";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import Trophy from "@lucide/svelte/icons/trophy";
	import ArrowDownAZ from "@lucide/svelte/icons/arrow-down-a-z";
	const data = getContext("data");

	let places = $state(data.places);
	let current = $state("return");

	function sortAlpha() {
		current = "alpha";
		places.sort((a, b) =>
			ascending(a.name.toLowerCase(), b.name.toLowerCase())
		);
		places = [...places];
	}

	function sortDate() {
		current = "date";
		places.sort((a, b) => descending(a.date, b.date));
		places = [...places];
	}

	function sortReturn() {
		current = "return";
		// yes = 3, maybe = 2, no = 1
		const rank = { yes: 3, maybe: 2, no: 1 };
		places.sort((a, b) => descending(rank[a.return], rank[b.return]));

		places = [...places];
	}
</script>

<header>
	<img src="assets/logo.png" alt="graze barrington logo" />

	<h1>graze barrington</h1>

	<p>
		i tried the most popular item at every food establishment in great
		barrington in 2025. 70 places reviewed in total.
	</p>

	<p class="merch">
		<a href="https://cottonbureau.com/people/sad-lunch-break" target="_blank"
			>merch!<br /></a
		>
		<span><small><sup>*</sup>nobody asked for</small></span>
	</p>
	<p class="sr-only">
		The best places to eat in great barrington. food reviews of every restaurant
		in the popular berkshire town.
	</p>
</header>

<div class="ui">
	<button onclick={sortReturn} class:active={current === "return"}>
		<Trophy /> sort by tiers
	</button>
	<button onclick={sortAlpha} class:active={current === "alpha"}>
		<ArrowDownAZ /> sort by name
	</button>
</div>
<section id="places">
	{#each places as p (p.name)}
		{@const img = p.name.replace(/\W/g, "").toLowerCase()}
		{@const src = `assets/${img}@2x.jpg`}
		{@const price = format("$,.2f")(p.cost)}
		{@const hide = !!p.hide}
		{@const the = p.name_note === "The"}
		<div class="place return-{p.return}" class:hide>
			<h2>
				{the ? "The " : ""}{p.name}{#if p.name_note && !the}<span
						>{p.name_note}</span
					>{/if}
			</h2>
			<img {src} alt={p.item} />
			<p class="item">
				<strong>{p.item}</strong>
				<span class="price">{price}</span>
			</p>
			{#if p.notes}
				<p class="notes">
					{@html p.notes}
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

	#places {
		max-width: none;
		display: flex;
		flex-wrap: wrap;
	}

	.place {
		/* padding-bottom: 16px;
		margin-bottom: 48px;
		margin-top: 32px;
		border-bottom: 1px dashed var(--color-border); */
		width: 10%;
		border: 1px solid var(--color-bg);
	}

	/* .place img {
		filter: grayscale(0.5);
	} */

	/* .return-yes {
		border-color: green;
	}

	.return-maybe {
		border-color: yellow;
	}

	.return-no {
		border-color: red;
	} */

	.hide {
		display: none;
	}

	h2 {
		line-height: 1.2;
		text-transform: lowercase;
		display: none;
	}

	.place p {
		display: none;
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

	.places img {
		display: none;
		/* margin: 16px auto; */
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

	button.active {
		background: var(--color-gray-100);
	}

	:global(.ui button svg) {
		width: 1.5em;
		margin-right: 8px;
	}

	p.merch {
		position: absolute;
		top: 8px;
		right: 16px;
		text-align: right;
		font-size: 14px;
	}

	header img {
		margin: 16px auto;
	}
</style>
