export const getShuffled = <T>(items: T[]) => {
	const result = [] as T[];

	items = items.slice();
	while (items.length) {
		const index = getRandomBetween(0, items.length - 1);
		const item = items.splice(index, 1)[0];
		result.push(item);
	}

	return result;
};

export const getRandomBetween = (
	min: number,
	max: number,
	exclude: number[] = []
) => {
	let n = 0;
	// eslint-disable-next-line no-constant-condition
	while (++n < 1000) {
		const value = min + Math.floor(Math.random() * (max - min + 1));
		if (!exclude.includes(value)) {
			return value;
		}
	}

	throw Error("Imposible get random between");
};

export const getRandomFrom = <T>(items: T[]) =>
	items[getRandomBetween(0, items.length - 1)];

export const base = [
	["н", "м"],
	["г", "ж"],
	["д", "т"],
	["к", "х"],
	["ч", "щ"],
	["п", "б"],
	["ш", "л"],
	["с", "з"],
	["в", "ф"],
	["р", "ц"],
];

export const delay = (n: number) =>
	new Promise((resolve) => setTimeout(resolve, n));
