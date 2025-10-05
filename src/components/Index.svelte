<script>
	import { getContext } from "svelte";
	import { format } from "d3";
	const data = getContext("data");
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

<section id="places">
	{#each data.places as p, i}
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
		margin: 48px auto;
		padding-bottom: 16px;
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
</style>
