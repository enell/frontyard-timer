import { expect, test } from "@playwright/experimental-ct-react";
import type { RaceConfig, RaceState } from "../../src/types/race";
import { StatsPanel } from "../../src/components/StatsPanel";

test.use({ viewport: { width: 280, height: 480 } });

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

test("StatsPanel — pre phase", async ({ mount }) => {
	const component = await mount(
		<div className="h-[480px]">
			<StatsPanel config={config} state={preState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("stats-pre.png");
});

test("StatsPanel — racing phase (lap 3)", async ({ mount }) => {
	const component = await mount(
		<div className="h-[480px]">
			<StatsPanel config={config} state={racingState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("stats-racing.png");
});
