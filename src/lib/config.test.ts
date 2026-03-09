import { describe, expect, it } from "vitest";
import { configFromSearch, configToSearch } from "./config";

function requireConfig<T>(value: T | null): T {
	expect(value).not.toBeNull();
	if (value === null) {
		throw new Error("Expected config to be present");
	}
	return value;
}

describe("configFromSearch", () => {
	it("parses valid query string", () => {
		const cfg = requireConfig(
			configFromSearch("start=2026-03-08T10:00&first=30&dec=1&dist=3.0"),
		);
		expect(cfg.start).toBe("2026-03-08T10:00");
		expect(cfg.firstLapMinutes).toBe(30);
		expect(cfg.decrementMinutes).toBe(1);
		expect(cfg.distanceKm).toBe(3.0);
	});

	it("returns null when start is missing", () => {
		expect(configFromSearch("first=30")).toBeNull();
	});

	it("returns null when start is invalid date", () => {
		expect(configFromSearch("start=not-a-date")).toBeNull();
	});

	it("falls back to defaults for missing optional params", () => {
		const cfg = requireConfig(configFromSearch("start=2026-03-08T10:00"));
		expect(cfg.firstLapMinutes).toBe(30);
		expect(cfg.decrementMinutes).toBe(1);
		expect(cfg.distanceKm).toBe(3.0);
	});

	it("falls back to defaults for invalid optional params", () => {
		const cfg = requireConfig(
			configFromSearch("start=2026-03-08T10:00&first=nope&dec=NaN&dist=abc"),
		);
		expect(cfg.firstLapMinutes).toBe(30);
		expect(cfg.decrementMinutes).toBe(1);
		expect(cfg.distanceKm).toBe(3.0);
	});
});

describe("configToSearch", () => {
	it("round-trips through configFromSearch", () => {
		const original = {
			start: "2026-06-15T09:30",
			firstLapMinutes: 25,
			decrementMinutes: 2,
			distanceKm: 5.5,
		};
		const search = configToSearch(original);
		const parsed = configFromSearch(search);
		expect(parsed).toEqual(original);
	});

	it("produces a valid URLSearchParams string", () => {
		const search = configToSearch({
			start: "2026-03-08T10:00",
			firstLapMinutes: 30,
			decrementMinutes: 1,
			distanceKm: 3.0,
		});
		expect(() => new URLSearchParams(search)).not.toThrow();
	});
});
