<script>
	import { getContext } from "svelte";
	import { format, ascending, descending, groups } from "d3";
	import CalendarDays from "@lucide/svelte/icons/calendar-days";
	import Trophy from "@lucide/svelte/icons/trophy";
	import ArrowDownAZ from "@lucide/svelte/icons/arrow-down-a-z";
	const data = getContext("data");

	const places = [...data.places];
	let byGroup = $state([["", [...data.places]]]);
	let current = $state("tier");

	function sortAlpha() {
		current = "alpha";
		const temp = [...places];
		temp.sort((a, b) => ascending(a.name.toLowerCase(), b.name.toLowerCase()));
		byGroup = [["", temp]];
	}

	// function sortDate() {
	// 	current = "date";
	// 	places.sort((a, b) => descending(a.date, b.date));
	// 	places = [...places];
	// }

	function sortTier() {
		current = "tier";
		// yes = 3, maybe = 2, no = 1
		const rank = { yes: 3, maybe: 2, no: 1 };
		const temp = [...places];
		temp.sort((a, b) => descending(rank[a.return], rank[b.return]));
		const grouped = groups(temp, (d) => d.return);
		grouped.sort((a, b) => descending(rank[a[0]], rank[b[0]]));
		byGroup = grouped;
	}

	function lookup(name) {
		if (name === "yes") return "will definitely";
		if (name === "maybe") return "might";
		if (name === "no") return "probably won't";
		return "";
	}

	$effect(() => {
		sortTier();
	});
</script>

<header>
	<img src="assets/logo.png" alt="graze barrington logo" />

	<h1>graze barrington</h1>

	<p>
		in 2025, i tried the most popular item at every food establishment in great
		barrington. here are the 71 places i reviewed.
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
	<button onclick={sortTier} class:active={current === "tier"}>
		<Trophy /> tiers
	</button>
	<button onclick={sortAlpha} class:active={current === "alpha"}>
		<ArrowDownAZ /> reviews
	</button>
</div>
<section id="places" class:tier={current === "tier"}>
	{#each byGroup as g}
		{@const name = g[0]}
		{@const places = g[1]}
		<div class="g">
			{#if name}<h2>places i {lookup(name)} eat at again</h2>{/if}
			<div class="g-places">
				{#each places as p (p.name)}
					{@const img = p.name.replace(/\W/g, "").toLowerCase()}
					{@const src = `assets/${img}@2x.jpg`}
					{@const price = format("$,.2f")(p.cost)}
					{@const hide = !!p.hide}
					{@const the = p.name_note === "The"}
					<div class="place return-{p.return}" class:hide>
						<h3 class={current === "tier" ? "text-outline" : ""}>
							{the ? "The " : ""}{p.name}{#if p.name_note && !the}<span
									>{p.name_note}</span
								>{/if}
						</h3>
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
			</div>
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
		max-width: var(--col-width);
		margin: 0 auto;
	}

	#places.tier {
		max-width: 1200px;
	}

	.tier .g {
		margin-bottom: 48px;
	}

	.g-places {
		display: flex;
		flex-wrap: wrap;
	}

	.place {
		padding-bottom: 16px;
		margin-top: 32px;
		border-bottom: 1px dashed var(--color-border);
	}

	.tier .place {
		padding: 0;
		margin: 0;
		border: none;
		width: 12.5%;
		outline: 2px solid var(--color-bg);
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
	}

	h3 {
		line-height: 1.2;
		text-transform: lowercase;
	}

	.tier h3 {
		font-size: 14px;
		margin: 0;
		padding: 6px;
		line-height: 1;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		color: var(--color-bg);
		--color-text-outline: var(--color-fg);
		font-weight: bold;
		user-select: none;
	}

	.tier h3 span {
		display: none;
	}

	.tier .place {
		display: flex;
		flex-direction: column-reverse;
		justify-content: flex-end;
		position: relative;
	}

	.tier .place p {
		display: none;
	}

	h3 span {
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
		margin: 16px auto;
	}

	.tier .places img {
		display: none;
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

	@media (max-width: 1200px) {
		.tier .place {
			width: 16.66%;
		}
	}

	@media (max-width: 1000px) {
		.tier .place {
			width: 20%;
		}
	}

	@media (max-width: 800px) {
		.tier .place {
			width: 25%;
		}
	}

	@media (max-width: 600px) {
		.tier .place {
			width: 33.33%;
		}
	}

	@media (max-width: 400px) {
		.tier .place {
			width: 50%;
		}
	}
</style>
