import type { RaceConfig } from "../types/race";

export const DEFAULT_FIRST_LAP_MINUTES = 30;
export const DEFAULT_DECREMENT_MINUTES = 1;
export const DEFAULT_DISTANCE_KM = 3;

const DEFAULTS: Omit<RaceConfig, "start"> = {
	firstLapMinutes: DEFAULT_FIRST_LAP_MINUTES,
	decrementMinutes: DEFAULT_DECREMENT_MINUTES,
	distanceKm: DEFAULT_DISTANCE_KM,
};

function parseNumberOrDefault(value: string | null, fallback: number): number {
	if (value === null) return fallback;
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : fallback;
}

export function isValidStart(start: string | undefined): start is string {
	return (
		typeof start === "string" &&
		start.length > 0 &&
		!Number.isNaN(new Date(start).getTime())
	);
}

export function configFromSearchParams(p: URLSearchParams): RaceConfig | null {
	const start = p.get("start") ?? undefined;
	if (!isValidStart(start)) return null;

	return {
		start,
		firstLapMinutes: parseNumberOrDefault(
			p.get("first"),
			DEFAULTS.firstLapMinutes,
		),
		decrementMinutes: parseNumberOrDefault(
			p.get("dec"),
			DEFAULTS.decrementMinutes,
		),
		distanceKm: parseNumberOrDefault(p.get("dist"), DEFAULTS.distanceKm),
	};
}

export function configFromSearch(search: string): RaceConfig | null {
	const normalizedSearch = search.startsWith("?") ? search.slice(1) : search;
	const p = new URLSearchParams(normalizedSearch);
	return configFromSearchParams(p);
}

export function configToSearchParams(config: RaceConfig): URLSearchParams {
	return new URLSearchParams({
		start: config.start,
		first: String(config.firstLapMinutes),
		dec: String(config.decrementMinutes),
		dist: String(config.distanceKm),
	});
}

export function configToSearch(config: RaceConfig): string {
	return configToSearchParams(config).toString();
}
