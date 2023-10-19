import { FC, useEffect, useState } from "react";
import { base, getRandomBetween, getRandomFrom, getShuffled } from "./util";
import { useEnterHandler } from "./hooks/useEnterHandler";

export const App: FC = () => {
	const [statistic, setStatistic] = useState(
		() =>
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0] as [
				number,
				number,
				number,
				number,
				number,
				number,
				number,
				number,
				number,
				number
			]
	);

	const [digit, setDigit] = useState(() => getRandomBetween(0, 9));

	const [mode, setMode] = useState(() =>
		getRandomFrom(["digit", "letter"] as const)
	);

	const [counter, setCounter] = useState(0);

	const [isBlocking, setIsBlocking] = useState(false);

	useEffect(() => {
		if (!isBlocking) {
			return;
		}

		const flag = setTimeout(() => {
			setDigit(() => getRandomBetween(0, 9, [digit]));

			setMode(() => getRandomFrom(["digit", "letter"] as const));

			setCounter((x) => x + 1);

			setStatistic((statistic) => {
				statistic = [...statistic];
				statistic[digit]++;
				return statistic;
			});

			setIsBlocking(false);
		}, 500);

		return () => {
			clearTimeout(flag);
		};
	}, [digit, isBlocking, statistic]);

	useEnterHandler({
		enabled: !isBlocking,
		handler: () => setIsBlocking(true),
	});

	const content = (() => {
		if (isBlocking) {
			return `${digit} ${base[digit].join(" ").toUpperCase()}`;
		}

		if (mode === "digit") {
			return digit.toString();
		}

		return getShuffled(base[digit]).join(" ").toUpperCase();
	})();

	return (
		<div className="w-screen h-screen overflow-hidden flex justify-center items-center">
			<div>
				<button
					disabled={isBlocking}
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
					onClick={() => {
						setIsBlocking(true);
					}}
				>
					{content}
				</button>
				<p>Итого: {counter}</p>
				{statistic.map((value, index) => (
					<p key={index}>
						{index}: {value} раз
					</p>
				))}
			</div>
		</div>
	);
};
