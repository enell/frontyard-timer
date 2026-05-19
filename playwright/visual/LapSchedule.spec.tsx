import { expect, test } from "@playwright/experimental-ct-react";
import type { RaceConfig, RaceState } from "../../src/types/race";
import { LapSchedule } from "../../src/components/LapSchedule";

test.use({ viewport: { width: 300, height: 400 } });

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

test("LapSchedule — pre phase", async ({ mount }) => {
	const component = await mount(
		<div className="h-[400px]">
			<LapSchedule config={config} state={preState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("lapschedule-pre.png");
});

test("LapSchedule — racing phase (lap 2 active)", async ({ mount }) => {
	const component = await mount(
		<div className="h-[400px]">
			<LapSchedule config={config} state={racingState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("lapschedule-racing.png");
});

test("LapSchedule — done phase", async ({ mount }) => {
	const component = await mount(
		<div className="h-[400px]">
			<LapSchedule config={config} state={doneState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("lapschedule-done.png");
});
