import { useAtomValue } from "jotai";
import { raceConfigAtom } from "../atoms/race-config.atom";
import type { RaceConfig } from "../types/race";

export function useRaceConfig(): RaceConfig | undefined {
	return useAtomValue(raceConfigAtom);
}

export function useRequiredRaceConfig(): RaceConfig {
	const config = useRaceConfig();
	if (!config) throw new Error("Race config is not available");
	return config;
}
