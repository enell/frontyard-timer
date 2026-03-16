import { describe, expect, it } from "bun:test";
import {
	formatHHMMSS,
	formatMMSS,
	formatTimestamp,
	formatTimestampHHMM,
	pad2,
} from "./format";

describe("pad2", () => {
	it("pads single digits", () => expect(pad2(5)).toBe("05"));
	it("leaves double digits unchanged", () => expect(pad2(42)).toBe("42"));
	it("floors floats", () => expect(pad2(9.9)).toBe("09"));
});

describe("formatMMSS", () => {
	it("formats 0 as 00:00", () => expect(formatMMSS(0)).toBe("00:00"));
	it("formats 90 as 01:30", () => expect(formatMMSS(90)).toBe("01:30"));
	it("formats 3599 as 59:59", () => expect(formatMMSS(3599)).toBe("59:59"));
});

describe("formatHHMMSS", () => {
	it("formats 0", () => expect(formatHHMMSS(0)).toBe("0:00:00"));
	it("formats 3661 as 1:01:01", () =>
		expect(formatHHMMSS(3661)).toBe("1:01:01"));
});

describe("formatTimestamp", () => {
	it("formats a known timestamp", () => {
		// 2026-01-01T10:05:30 local — build via Date to avoid tz issues
		const d = new Date(2026, 0, 1, 10, 5, 30);
		expect(formatTimestamp(d.getTime())).toBe("10:05:30");
	});
});

describe("formatTimestampHHMM", () => {
	it("omits seconds", () => {
		const d = new Date(2026, 0, 1, 14, 22, 59);
		expect(formatTimestampHHMM(d.getTime())).toBe("14:22");
	});
});
