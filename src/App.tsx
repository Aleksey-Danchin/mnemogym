import { FC, useState } from "react";

export const getShuffled = <T,>(items: T[]) => {
	const result = [] as T[];

	items = items.slice();
	while (items.length) {
		const index = getRandomBetween(0, items.length - 1);
		const item = items.splice(index, 1)[0];
		result.push(item);
	}

	return result;
};

export const getRandomBetween = (min: number, max: number) =>
	min + Math.floor(Math.random() * (max - min + 1));

export const getRandomFrom = <T,>(items: T[]) =>
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

export const App: FC = () => {
	const [digit, setDigit] = useState(() => getRandomBetween(0, 9));

	const [mode, setMode] = useState(() =>
		getRandomFrom(["digit", "letter"] as const)
	);

	const letters = getShuffled(base[digit]).join(" ").toUpperCase();

	const [counter, setCounter] = useState(0);

	const [isBlocking, setIsBlocking] = useState(false);

	const clickHandler = () => {
		setIsBlocking(true);

		delay(500).then(() => {
			setIsBlocking(false);

			setDigit((digit) => {
				let nextDigit = digit;

				while (nextDigit === digit) {
					nextDigit = getRandomBetween(0, 9);
				}

				return nextDigit;
			});

			setMode(() => getRandomFrom(["digit", "letter"] as const));

			setCounter((x) => x + 1);
		});
	};

	return (
		<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
			<div>
				<button
					disabled={isBlocking}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
					onClick={clickHandler}
				>
					{mode === "digit" &&
						`${digit.toString()} ${
							isBlocking ? `(${letters})` : ""
						}`}

					{mode === "letter" &&
						`${letters} ${isBlocking ? `(${digit})` : ""}`}
				</button>
				<p>Итого: {counter}</p>
			</div>
		</div>
	);
};
