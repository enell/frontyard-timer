import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import type { RaceConfig, RaceState } from "../types/race";
import { TimerDisplay } from "./TimerDisplay";

const config: RaceConfig = {
	start: "2026-01-01T10:00:00",
	firstLapMinutes: 30,
	decrementMinutes: 1,
	distanceKm: 3.0,
};

const preStateSoon: RaceState = { phase: "pre", secsToStart: 300 };
const preStateFar: RaceState = { phase: "pre", secsToStart: 90000 };
const racingState: RaceState = {
	phase: "racing",
	currentLap: 3,
	lapsDone: 2,
	secsLeft: 840,
	lapDurationSecs: 1680,
	totalElapsedSecs: 3360,
};
const racingLastLap: RaceState = {
	phase: "racing",
	currentLap: 30,
	lapsDone: 29,
	secsLeft: 60,
	lapDurationSecs: 60,
	totalElapsedSecs: 25800,
};
const racingUrgentState: RaceState = {
	phase: "racing",
	currentLap: 5,
	lapsDone: 4,
	secsLeft: 90,
	lapDurationSecs: 1560,
	totalElapsedSecs: 7440,
};
const doneState: RaceState = {
	phase: "done",
	lapsDone: 30,
	totalElapsedSecs: 27000,
};

describe("TimerDisplay", () => {
	it("shows STARTING SOON label in pre phase", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={preStateSoon} />,
		);
		expect(getByText("STARTING SOON")).toBeInTheDocument();
	});

	it("shows date label when start is more than 24 h away", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={preStateFar} />,
		);
		expect(getByText(/STARTS/)).toBeInTheDocument();
	});

	it("shows LAP N label during racing phase", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={racingState} />,
		);
		expect(getByText("LAP 3")).toBeInTheDocument();
	});

	it("shows countdown digits during racing phase", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={racingState} />,
		);
		expect(getByText("14:00")).toBeInTheDocument();
	});

	it("shows next lap minutes when not on final lap", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={racingState} />,
		);
		expect(getByText(/Next lap: 27 min/)).toBeInTheDocument();
	});

	it("does not show next lap minutes on final lap", () => {
		const { queryByText } = render(
			<TimerDisplay config={config} state={racingLastLap} />,
		);
		expect(queryByText(/Next lap:/)).not.toBeInTheDocument();
	});

	it("applies red text when fewer than 2 minutes remain", () => {
		const { container } = render(
			<TimerDisplay config={config} state={racingUrgentState} />,
		);
		expect(container.innerHTML).toContain("text-red-500");
	});

	it("shows RACE DONE label when done", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={doneState} />,
		);
		expect(getByText("RACE DONE")).toBeInTheDocument();
	});

	it("shows LAP CLOSED when done", () => {
		const { getByText } = render(
			<TimerDisplay config={config} state={doneState} />,
		);
		expect(getByText("LAP CLOSED")).toBeInTheDocument();
	});

	it("matches snapshot for pre phase", () => {
		const { container } = render(
			<TimerDisplay config={config} state={preStateSoon} />,
		);
		// Replace the displayed countdown with a placeholder to keep snapshot stable
		const html = container.innerHTML.replace(/\d{2}:\d{2}/g, "MM:SS");
		expect(html).toMatchSnapshot();
	});

	it("matches snapshot for racing phase", () => {
		const { container } = render(
			<TimerDisplay config={config} state={racingState} />,
		);
		const html = container.innerHTML.replace(/\d{2}:\d{2}/g, "MM:SS");
		expect(html).toMatchSnapshot();
	});

	it("matches snapshot for done phase", () => {
		const { container } = render(
			<TimerDisplay config={config} state={doneState} />,
		);
		expect(container.innerHTML).toMatchSnapshot();
	});
});
