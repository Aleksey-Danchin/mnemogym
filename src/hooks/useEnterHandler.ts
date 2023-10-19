import { useEffect } from "react";

export type UseEnterHandler = (e: KeyboardEvent) => void;

export type UseEnterHandlerArg =
	| UseEnterHandler
	| {
			element?: HTMLElement;
			enabled?: boolean;
			handler: UseEnterHandler;
	  };

export const useEnterHandler = (data: UseEnterHandlerArg) => {
	const [element, enabled, handler] = (() => {
		if (data instanceof Function) {
			return [document.body, true, data];
		}

		return [
			data.element ?? document.body,
			data.enabled ?? true,
			data.handler,
		];
	})();

	useEffect(() => {
		if (!enabled) {
			return;
		}

		const keydownHandler = (e: KeyboardEvent) => {
			if (e.key === "Enter") {
				handler(e);
			}
		};

		element.addEventListener("keydown", keydownHandler);

		return () => {
			element.removeEventListener("keydown", keydownHandler);
		};
	}, [element, enabled, handler]);
};
