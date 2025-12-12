import { descending } from "d3";
import raw from "$data/places.csv";
export async function load() {
	const a = raw.filter((d) => d.item && d.date);
	const places = a.map((d) => ({
		...d,
		return: d.return.trim()
	}));
	places.sort((a, b) => descending(a.date, b.date));
	return { places };
}
