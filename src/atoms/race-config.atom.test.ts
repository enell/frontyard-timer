import { beforeEach, describe, expect, it } from "bun:test";
import { createStore } from "jotai";
import { decAtom, setDecAtom } from "./dec.atom";
import { distAtom, setDistAtom } from "./dist.atom";
import { firstAtom, setFirstAtom } from "./first.atom";
import { locationAtom } from "./location.atom";
import { raceConfigAtom, setRaceConfigAtom } from "./race-config.atom";
import { setStartAtom, startAtom } from "./start.atom";

describe("race config atoms", () => {
	beforeEach(() => {
		window.history.replaceState(null, "", "/");
	});

	it("uses defaults for optional first/dec/dist when missing", () => {
		const store = createStore();
		store.set(setStartAtom, "2026-03-08T10:00");

		expect(store.get(firstAtom)).toBe(30);
		expect(store.get(decAtom)).toBe(1);
		expect(store.get(distAtom)).toBe(3);

		expect(store.get(raceConfigAtom)).toEqual({
			start: "2026-03-08T10:00",
			firstLapMinutes: 30,
			decrementMinutes: 1,
			distanceKm: 3,
		});
	});

	it("requires a valid start to produce race config", () => {
		const store = createStore();
		expect(store.get(startAtom)).toBeUndefined();
		expect(store.get(raceConfigAtom)).toBeUndefined();

		store.set(setStartAtom, "not-a-date");
		expect(store.get(raceConfigAtom)).toBeUndefined();
	});

	it("each setter updates only its own key and preserves others", () => {
		const store = createStore();
		store.set(setStartAtom, "2026-03-08T10:00");
		store.set(setDecAtom, 2);
		store.set(setDistAtom, 5);

		store.set(setFirstAtom, 45);

		const params = store.get(locationAtom).searchParams;
		expect(params?.get("start")).toBe("2026-03-08T10:00");
		expect(params?.get("first")).toBe("45");
		expect(params?.get("dec")).toBe("2");
		expect(params?.get("dist")).toBe("5");
	});

	it("setRaceConfig writes all params in one operation chain", () => {
		const store = createStore();

		store.set(setRaceConfigAtom, {
			start: "2026-03-08T10:00",
			firstLapMinutes: 42,
			decrementMinutes: 3,
			distanceKm: 4.5,
		});

		expect(store.get(raceConfigAtom)).toEqual({
			start: "2026-03-08T10:00",
			firstLapMinutes: 42,
			decrementMinutes: 3,
			distanceKm: 4.5,
		});
	});
});
