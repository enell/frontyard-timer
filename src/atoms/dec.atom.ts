import { atom } from "jotai";
import { DEFAULT_DECREMENT_MINUTES } from "../lib/config";
import { locationAtom } from "./location.atom";

function parseOrDefault(value: string | null, fallback: number): number {
	if (value === null) return fallback;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

export const decAtom = atom((get) => {
	const value = get(locationAtom).searchParams?.get("dec") ?? null;
	return parseOrDefault(value, DEFAULT_DECREMENT_MINUTES);
});

export const setDecAtom = atom(null, (_get, set, dec: number | undefined) => {
	set(locationAtom, (prev) => {
		const searchParams = new URLSearchParams(prev.searchParams);
		if (typeof dec === "number" && Number.isFinite(dec))
			searchParams.set("dec", String(dec));
		else searchParams.delete("dec");

		return {
			...prev,
			pathname: "/",
			searchParams,
		};
	});
});
