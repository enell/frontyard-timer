export interface RaceConfig {
	/** ISO 8601 datetime string — the scheduled race start */
	start: string;
	/** Duration of lap 1 in minutes */
	firstLapMinutes: number;
	/** Minutes subtracted each subsequent lap */
	decrementMinutes: number;
	/** Loop length in km */
	distanceKm: number;
}

export type RacePhase = "pre" | "racing" | "done";

export interface RaceState {
	phase: RacePhase;
	secsToStart?: number;
	currentLap?: number;
	lapDurationSecs?: number;
	secsLeft?: number;
	lapsDone?: number;
	totalElapsedSecs?: number;
}

export interface LapInfo {
	lap: number;
	durationSecs: number;
	startTs: number;
}
