import { useMemo } from "react";
import { getRaceState } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";
import { useClock } from "./useClock";

export function useRaceState(config: RaceConfig): RaceState {
	const now = useClock();
	return useMemo(() => getRaceState(config, now.getTime()), [config, now]);
}
