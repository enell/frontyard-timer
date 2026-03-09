import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useClock } from "./useClock";

describe("useClock", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it("returns a Date", () => {
		const { result } = renderHook(() => useClock());
		expect(result.current).toBeInstanceOf(Date);
	});

	it("updates every second", () => {
		const { result } = renderHook(() => useClock());
		const initial = result.current.getTime();
		act(() => vi.advanceTimersByTime(1000));
		expect(result.current.getTime()).toBeGreaterThan(initial);
	});
});
