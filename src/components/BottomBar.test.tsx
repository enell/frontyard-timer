import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { RaceConfig, RaceState } from "../types/race";
import { BottomBar } from "./BottomBar";

const config: RaceConfig = {
	start: "2026-01-01T10:00:00",
	firstLapMinutes: 30,
	decrementMinutes: 1,
	distanceKm: 3.0,
};

const preState: RaceState = { phase: "pre" };
const racingState: RaceState = {
	phase: "racing",
	currentLap: 3,
	lapsDone: 2,
	totalElapsedSecs: 3540,
};

describe("BottomBar", () => {
	it("shows start time", () => {
		render(<BottomBar config={config} state={preState} />);
		expect(screen.getByText("10:00")).toBeInTheDocument();
	});

	it("shows laps done and max", () => {
		render(<BottomBar config={config} state={racingState} />);
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("30")).toBeInTheDocument();
	});

	it("shows total km", () => {
		render(<BottomBar config={config} state={racingState} />);
		expect(screen.getByText(/6\.0 km totalt/)).toBeInTheDocument();
	});

	it("shows pre-race status when not started", () => {
		render(<BottomBar config={config} state={preState} />);
		expect(screen.getByText("Loppet ej startat")).toBeInTheDocument();
	});
});
