import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Args<T> {
	value: T;
	delay: number;
}

interface useDebounce<T> {
	debouncedValue: T;
	setDebouncedValue: Dispatch<SetStateAction<T>>;
}

/**
 * Hook that implements debouncing for a given value.
 * @template T
 * @param {Object} args - Hook arguments.
 * @param {T} args.value - Value to debounce.
 * @param {number} [args.delay=3000] - Delay in milliseconds before updating the debounced value.
 * @returns {useDebounce<T>} - Object with the debounced value and the function to update it.
 */
export const useDebounce = <T>({ value, delay = 3000 }: Args<T>): useDebounce<T> => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return { debouncedValue, setDebouncedValue };
};
