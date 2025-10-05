import { descending } from "d3";
import raw from "$data/places.csv";
export async function load() {
	const places = raw.filter((d) => d.item);
	places.sort((a, b) => descending(a.date, b.date));
	return { places };
}
