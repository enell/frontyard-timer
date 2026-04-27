import { expect, test } from "@playwright/experimental-ct-react";
import type { RaceConfig, RaceState } from "../../src/types/race";
import { TimerDisplay } from "../../src/components/TimerDisplay";

test.use({ viewport: { width: 960, height: 600 } });

const config: RaceConfig = {
	start: "2026-01-01T10:00:00",
	firstLapMinutes: 30,
	decrementMinutes: 1,
	distanceKm: 3.0,
};

const preState: RaceState = { phase: "pre", secsToStart: 300 };
const racingState: RaceState = {
	phase: "racing",
	currentLap: 3,
	lapsDone: 2,
	secsLeft: 840,
	lapDurationSecs: 1680,
	totalElapsedSecs: 3360,
};
const doneState: RaceState = {
	phase: "done",
	lapsDone: 30,
	totalElapsedSecs: 27000,
};

test("TimerDisplay — pre phase (starting soon)", async ({ mount }) => {
	const component = await mount(
		<div className="h-[600px] bg-black">
			<TimerDisplay config={config} state={preState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("timer-pre.png");
});

test("TimerDisplay — racing phase (lap 3)", async ({ mount }) => {
	const component = await mount(
		<div className="h-[600px] bg-black">
			<TimerDisplay config={config} state={racingState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("timer-racing.png");
});

test("TimerDisplay — done phase", async ({ mount }) => {
	const component = await mount(
		<div className="h-[600px] bg-black">
			<TimerDisplay config={config} state={doneState} />
		</div>,
	);
	await expect(component).toHaveScreenshot("timer-done.png");
});
