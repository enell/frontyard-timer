import { atom } from "jotai";
import { isValidStart } from "../lib/config";
import type { RaceConfig } from "../types/race";
import { decAtom, setDecAtom } from "./dec.atom";
import { distAtom, setDistAtom } from "./dist.atom";
import { firstAtom, setFirstAtom } from "./first.atom";
import { setStartAtom, startAtom } from "./start.atom";

export const raceConfigAtom = atom<RaceConfig | undefined>((get) => {
	const start = get(startAtom);
	if (!isValidStart(start)) return undefined;

	return {
		start,
		firstLapMinutes: get(firstAtom),
		decrementMinutes: get(decAtom),
		distanceKm: get(distAtom),
	};
});

export const setRaceConfigAtom = atom(null, (_get, set, config: RaceConfig) => {
	set(setStartAtom, config.start);
	set(setFirstAtom, config.firstLapMinutes);
	set(setDecAtom, config.decrementMinutes);
	set(setDistAtom, config.distanceKm);
});
