import type { LapInfo, RaceConfig, RaceState } from "../types/race";

export function lapDurationSecs(config: RaceConfig, lap: number): number {
	const mins = config.firstLapMinutes - (lap - 1) * config.decrementMinutes;
	return Math.max(1, mins) * 60;
}

export function maxLaps(config: RaceConfig): number {
	let n = 1;
	while (config.firstLapMinutes - n * config.decrementMinutes >= 1) n++;
	return n;
}

export function lapStartTs(config: RaceConfig, lap: number): number {
	const startTs = new Date(config.start).getTime();
	let ts = startTs;
	for (let i = 1; i < lap; i++) ts += lapDurationSecs(config, i) * 1000;
	return ts;
}

export function buildLapSchedule(config: RaceConfig, count = 12): LapInfo[] {
	const laps: LapInfo[] = [];
	for (let i = 1; i <= count; i++) {
		const dur = lapDurationSecs(config, i);
		if (dur < 60) break;
		laps.push({ lap: i, durationSecs: dur, startTs: lapStartTs(config, i) });
	}
	return laps;
}

export function getRaceState(config: RaceConfig, nowTs: number): RaceState {
	const startTs = new Date(config.start).getTime();

	if (nowTs < startTs) {
		return {
			phase: "pre",
			secsToStart: Math.ceil((startTs - nowTs) / 1000),
		};
	}

	let elapsed = (nowTs - startTs) / 1000;
	let lap = 1;

	while (true) {
		const dur = lapDurationSecs(config, lap);
		if (elapsed < dur) {
			return {
				phase: "racing",
				currentLap: lap,
				lapDurationSecs: dur,
				secsLeft: Math.ceil(dur - elapsed),
				lapsDone: lap - 1,
				totalElapsedSecs: Math.floor((nowTs - startTs) / 1000),
			};
		}
		elapsed -= dur;
		lap++;
		// Race is done when the next lap's unclamped minutes are <= 0
		const nextMins =
			config.firstLapMinutes - (lap - 1) * config.decrementMinutes;
		if (nextMins <= 0) {
			return {
				phase: "done",
				lapsDone: lap - 1,
				totalElapsedSecs: Math.floor((nowTs - startTs) / 1000),
			};
		}
	}
}
