import { atom } from "jotai";
import { DEFAULT_DISTANCE_KM } from "../lib/config";
import { locationAtom } from "./location.atom";

function parseOrDefault(value: string | null, fallback: number): number {
	if (value === null) return fallback;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

export const distAtom = atom((get) => {
	const value = get(locationAtom).searchParams?.get("dist") ?? null;
	return parseOrDefault(value, DEFAULT_DISTANCE_KM);
});

export const setDistAtom = atom(null, (_get, set, dist: number | undefined) => {
	set(locationAtom, (prev) => {
		const searchParams = new URLSearchParams(prev.searchParams);
		if (typeof dist === "number" && Number.isFinite(dist))
			searchParams.set("dist", String(dist));
		else searchParams.delete("dist");

		return {
			...prev,
			pathname: "/",
			searchParams,
		};
	});
});
