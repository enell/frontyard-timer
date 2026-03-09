import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { RaceState } from "../types/race";
import { useBanner } from "./useBanner";

describe("useBanner", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	const preState: RaceState = { phase: "pre", secsToStart: 300 };
	const raceState: RaceState = {
		phase: "racing",
		currentLap: 1,
		lapDurationSecs: 1800,
		secsLeft: 1799,
		lapsDone: 0,
	};

	it("shows banner when secsToStart === 300", () => {
		const { result } = renderHook(() => useBanner(preState));
		expect(result.current.visible).toBe(true);
		expect(result.current.message).toContain("5 MINUTER");
	});

	it("hides banner after duration elapses", () => {
		const { result } = renderHook(() => useBanner(preState, 1000));
		expect(result.current.visible).toBe(true);
		act(() => vi.advanceTimersByTime(1100));
		expect(result.current.visible).toBe(false);
	});

	it("shows lap start banner for racing phase", () => {
		const { result } = renderHook(() => useBanner(raceState));
		expect(result.current.visible).toBe(true);
		expect(result.current.message).toContain("VARV 1");
	});

	it("does not repeat the same banner key", () => {
		const { result, rerender } = renderHook(({ state }) => useBanner(state), {
			initialProps: { state: preState },
		});
		const firstMessage = result.current.message;
		rerender({ state: preState });
		expect(result.current.message).toBe(firstMessage);
	});

	it("shows done banner", () => {
		const doneState: RaceState = { phase: "done", lapsDone: 5 };
		const { result } = renderHook(() => useBanner(doneState));
		expect(result.current.visible).toBe(true);
		expect(result.current.message).toContain("KLART");
	});
});
