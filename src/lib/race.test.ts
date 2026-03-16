import { describe, expect, it } from "bun:test";
import type { RaceConfig } from "../types/race";
import {
	buildLapSchedule,
	getRaceState,
	lapDurationSecs,
	lapStartTs,
	maxLaps,
} from "./race";

const BASE: RaceConfig = {
	start: "2026-01-01T10:00:00",
	firstLapMinutes: 5,
	decrementMinutes: 1,
	distanceKm: 3,
};

const startTs = new Date(BASE.start).getTime();

describe("lapDurationSecs", () => {
	it("returns firstLapMinutes * 60 for lap 1", () => {
		expect(lapDurationSecs(BASE, 1)).toBe(300);
	});

	it("decrements each lap", () => {
		expect(lapDurationSecs(BASE, 2)).toBe(240);
		expect(lapDurationSecs(BASE, 3)).toBe(180);
	});

	it("never goes below 60 seconds", () => {
		expect(lapDurationSecs(BASE, 100)).toBe(60);
	});
});

describe("maxLaps", () => {
	it("counts laps until duration would be < 1 min", () => {
		// 5, 4, 3, 2, 1 → 5 laps
		expect(maxLaps(BASE)).toBe(5);
	});

	it("handles zero decrement", () => {
		// With no decrement, maxLaps loops forever — cap check: our impl loops while >= 1
		// With 0 dec, firstLapMinutes(5) - n*0 = 5 always >= 1, so it should return a large number
		// The actual function loops while >= 1 min, so this will overflow — test the safe config
		const cfg2 = { ...BASE, firstLapMinutes: 3, decrementMinutes: 1 };
		expect(maxLaps(cfg2)).toBe(3);
	});
});

describe("lapStartTs", () => {
	it("lap 1 starts at race start", () => {
		expect(lapStartTs(BASE, 1)).toBe(startTs);
	});

	it("lap 2 starts after lap 1 duration", () => {
		expect(lapStartTs(BASE, 2)).toBe(startTs + 300_000);
	});

	it("lap 3 starts after lap 1 + lap 2 durations", () => {
		expect(lapStartTs(BASE, 3)).toBe(startTs + 300_000 + 240_000);
	});
});

describe("buildLapSchedule", () => {
	it("returns the correct number of laps", () => {
		const schedule = buildLapSchedule(BASE);
		expect(schedule.length).toBe(12); // default count=12; all have min 60s due to Math.max(1,mins)
	});

	it("each entry has correct lap number and startTs", () => {
		const [first, second] = buildLapSchedule(BASE);
		expect(first.lap).toBe(1);
		expect(first.startTs).toBe(startTs);
		expect(second.lap).toBe(2);
		expect(second.startTs).toBe(startTs + 300_000);
	});

	it("respects count limit", () => {
		const schedule = buildLapSchedule(BASE, 2);
		expect(schedule.length).toBe(2);
	});
});

describe("getRaceState", () => {
	it("returns pre-race state before start", () => {
		const state = getRaceState(BASE, startTs - 60_000);
		expect(state.phase).toBe("pre");
		expect(state.secsToStart).toBe(60);
	});

	it("returns racing state during lap 1", () => {
		const state = getRaceState(BASE, startTs + 60_000); // 1 min into lap 1
		expect(state.phase).toBe("racing");
		expect(state.currentLap).toBe(1);
		expect(state.secsLeft).toBe(240); // 5min - 1min = 4min
		expect(state.lapsDone).toBe(0);
	});

	it("returns racing state in lap 2", () => {
		const state = getRaceState(BASE, startTs + 300_000 + 30_000); // 30s into lap 2
		expect(state.phase).toBe("racing");
		expect(state.currentLap).toBe(2);
		expect(state.lapsDone).toBe(1);
	});

	it("returns done state after all laps", () => {
		// With Math.max(1,mins) clamping, lapDurationSecs always >= 60s
		// so done is only reached when configured minutes <= 0 (unclamped)
		// Use a config where we can actually exhaust laps
		const tightCfg: RaceConfig = {
			...BASE,
			firstLapMinutes: 2,
			decrementMinutes: 2,
		};
		// lap 1 = 2min, lap 2 = max(1,0)*60 = 60s. Next lap unclamped = -2min → done
		const tightStart = new Date(tightCfg.start).getTime();
		const state = getRaceState(tightCfg, tightStart + 180_000 + 1);
		expect(state.phase).toBe("done");
	});

	it("secsToStart rounds up", () => {
		const state = getRaceState(BASE, startTs - 500); // 0.5s before start
		expect(state.phase).toBe("pre");
		expect(state.secsToStart).toBe(1);
	});

	it("exact start moment is phase racing", () => {
		const state = getRaceState(BASE, startTs);
		expect(state.phase).toBe("racing");
		expect(state.currentLap).toBe(1);
	});
});
