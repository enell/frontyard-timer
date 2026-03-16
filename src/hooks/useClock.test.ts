import { describe, expect, it } from "bun:test";
import { renderHook, waitFor } from "@testing-library/react";
import { useClock } from "./useClock";

describe("useClock", () => {
	it("returns a Date", () => {
		const { result } = renderHook(() => useClock());
		expect(result.current).toBeInstanceOf(Date);
	});

	it("updates every second", async () => {
		const { result } = renderHook(() => useClock());
		const initial = result.current.getTime();

		await waitFor(
			() => {
				expect(result.current.getTime()).not.toBe(initial);
			},
			{ timeout: 2500 },
		);
	});
});
