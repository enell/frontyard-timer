import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import type { RaceConfig, RaceState } from "../types/race";
import { LapSchedule } from "./LapSchedule";

const config: RaceConfig = {
	start: "2026-01-01T10:00:00",
	firstLapMinutes: 5,
	decrementMinutes: 1,
	distanceKm: 1.0,
};

const preState: RaceState = { phase: "pre" };
const racingState: RaceState = {
	phase: "racing",
	currentLap: 2,
	lapsDone: 1,
	secsLeft: 240,
	lapDurationSecs: 240,
	totalElapsedSecs: 300,
};
const doneState: RaceState = {
	phase: "done",
	lapsDone: 5,
	totalElapsedSecs: 900,
};

describe("LapSchedule", () => {
	it("renders the LAPS header", () => {
		const { getByText } = render(
			<LapSchedule config={config} state={preState} />,
		);
		expect(getByText("LAPS")).toBeInTheDocument();
	});

	it("renders a row for each lap", () => {
		const { getAllByRole } = render(
			<LapSchedule config={config} state={preState} />,
		);
		// 5 laps + 1 header row
		const rows = getAllByRole("row");
		expect(rows.length).toBe(6);
	});

	it("shows lap numbers in the table", () => {
		const { getByRole } = render(
			<LapSchedule config={config} state={preState} />,
		);
		const table = getByRole("table");
		expect(table.textContent).toContain("1");
		expect(table.textContent).toContain("5");
	});

	it("highlights the current lap row", () => {
		const { getAllByRole } = render(
			<LapSchedule config={config} state={racingState} />,
		);
		const rows = getAllByRole("row");
		// row index 2 = lap 2 (index 0 is header, index 1 is lap 1, index 2 is lap 2)
		const currentRow = rows[2];
		expect(currentRow.className).toContain("bg-white");
		expect(currentRow.className).toContain("text-black");
	});

	it("dims past lap rows", () => {
		const { getAllByRole } = render(
			<LapSchedule config={config} state={racingState} />,
		);
		const rows = getAllByRole("row");
		// row index 1 = lap 1 (past)
		expect(rows[1].className).toContain("opacity-30");
	});

	it("does not highlight any row in pre phase", () => {
		const { getAllByRole } = render(
			<LapSchedule config={config} state={preState} />,
		);
		const rows = getAllByRole("row");
		for (const row of rows) {
			expect(row.className).not.toContain("bg-white");
		}
	});

	it("dims all lap rows in done phase", () => {
		const { getAllByRole } = render(
			<LapSchedule config={config} state={doneState} />,
		);
		const rows = getAllByRole("row");
		// Skip header row (index 0)
		for (const row of rows.slice(1)) {
			expect(row.className).toContain("opacity-30");
		}
	});

	it("shows tempo column header", () => {
		const { getByText } = render(
			<LapSchedule config={config} state={preState} />,
		);
		expect(getByText("Tempo")).toBeInTheDocument();
	});
});
