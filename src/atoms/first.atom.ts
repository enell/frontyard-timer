import { atom } from "jotai";
import { DEFAULT_FIRST_LAP_MINUTES } from "../lib/config";
import { locationAtom } from "./location.atom";

function parseOrDefault(value: string | null, fallback: number): number {
	if (value === null) return fallback;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

export const firstAtom = atom((get) => {
	const value = get(locationAtom).searchParams?.get("first") ?? null;
	return parseOrDefault(value, DEFAULT_FIRST_LAP_MINUTES);
});

export const setFirstAtom = atom(
	null,
	(_get, set, first: number | undefined) => {
		set(locationAtom, (prev) => {
			const searchParams = new URLSearchParams(prev.searchParams);
			if (typeof first === "number" && Number.isFinite(first))
				searchParams.set("first", String(first));
			else searchParams.delete("first");

			return {
				...prev,
				pathname: "/",
				searchParams,
			};
		});
	},
);
