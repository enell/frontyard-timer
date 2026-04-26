import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import type { RaceConfig, RaceState } from "../types/race";
import { StatsPanel } from "./StatsPanel";

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
	secsLeft: 840,
	lapDurationSecs: 1680,
	totalElapsedSecs: 3360,
};

describe("StatsPanel", () => {
	it("shows — for current lap in pre phase", () => {
		const { getByText } = render(
			<StatsPanel config={config} state={preState} />,
		);
		expect(getByText("—")).toBeInTheDocument();
	});

	it("shows current lap number during racing", () => {
		const { getByText } = render(
			<StatsPanel config={config} state={racingState} />,
		);
		expect(getByText("3")).toBeInTheDocument();
	});

	it("shows lap duration in minutes", () => {
		const { getByText } = render(
			<StatsPanel config={config} state={racingState} />,
		);
		// Lap 3 duration: (30 - 2) = 28 min
		expect(getByText("28 min")).toBeInTheDocument();
	});

	it("shows max laps", () => {
		const { getByText } = render(
			<StatsPanel config={config} state={preState} />,
		);
		// maxLaps for firstLapMinutes=30, decrementMinutes=1 is 30
		expect(getByText("30")).toBeInTheDocument();
	});

	it("shows stat labels", () => {
		const { getByText } = render(
			<StatsPanel config={config} state={preState} />,
		);
		expect(getByText("Varv")).toBeInTheDocument();
		expect(getByText("Varvtid")).toBeInTheDocument();
		expect(getByText("Max varv")).toBeInTheDocument();
	});

	it("matches snapshot for pre phase", () => {
		const { container } = render(
			<StatsPanel config={config} state={preState} />,
		);
		expect(container.innerHTML).toMatchSnapshot();
	});

	it("matches snapshot for racing phase", () => {
		const { container } = render(
			<StatsPanel config={config} state={racingState} />,
		);
		expect(container.innerHTML).toMatchSnapshot();
	});
});
