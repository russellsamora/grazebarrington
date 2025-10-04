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
</header>

<section id="places">
	{#each data.places as p}
		{@const img = p.name.replace(/\W/g, "").toLowerCase()}
		{@const src = `assets/${img}@2x.jpg`}
		{@const price = format("$,.2f")(p.cost)}
		{@const hide = !!p.hide}
		<div class="item" class:hide>
			<h2>{p.name}</h2>
			<img {src} alt={"Image of " + p.item} />
			<p>
				<strong>item:</strong>
				{p.item}
			</p>
			<p><strong>price:</strong> {price}</p>
			{#if p.notes}
				<p class="notes"><strong>notes:</strong> {p.notes}</p>
			{/if}
			<p><strong>return visit?</strong> {p.return}</p>
		</div>
	{/each}
</section>

<style>
	section {
		max-width: var(--col-width);
		margin: 0 auto;
	}

	.item {
		margin-bottom: 24px;
		padding-bottom: 24px;
		border-bottom: 1px dashed var(--color-border);
	}

	.hide {
		display: none;
	}

	h2 {
		line-height: 1.2;
		text-transform: lowercase;
	}

	p {
		margin: 8px auto;
	}

	img {
		margin: 16px auto;
	}

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
</style>
