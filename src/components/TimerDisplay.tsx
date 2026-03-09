import { clsx } from "clsx";
import { formatHHMMSS, formatMMSS, formatTimestamp } from "../lib/format";
import { lapDurationSecs, lapStartTs } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";

interface TimerDisplayProps {
	state: RaceState;
	config: RaceConfig;
}

export function TimerDisplay({ state, config }: TimerDisplayProps) {
	const { phase } = state;

	const digits = (() => {
		if (phase === "pre" && state.secsToStart !== undefined)
			return state.secsToStart > 3600
				? formatHHMMSS(state.secsToStart)
				: formatMMSS(state.secsToStart);
		if (phase === "racing" && state.secsLeft !== undefined)
			return formatMMSS(state.secsLeft);
		return "00:00";
	})();

	const label = (() => {
		if (phase === "pre") return "LOPPET STARTAR OM";
		if (phase === "done") return "LOPPET AVSLUTAT";
		return "TILL NÄSTA START";
	})();

	const pct = (() => {
		if (phase !== "racing" || !state.secsLeft || !state.lapDurationSecs)
			return 1;
		return state.secsLeft / state.lapDurationSecs;
	})();

	const colorClass = (() => {
		if (phase !== "racing") return "text-lime-300";
		if ((state.secsLeft ?? 999) <= 30) return "text-red-500 animate-pulse";
		if ((state.secsLeft ?? 999) <= 90) return "text-orange-400 animate-pulse";
		return "text-lime-300";
	})();

	const barColor = (() => {
		if (phase !== "racing") return "bg-lime-300";
		if ((state.secsLeft ?? 999) <= 30) return "bg-red-500";
		if ((state.secsLeft ?? 999) <= 90) return "bg-orange-400";
		return "bg-lime-300";
	})();

	const nextStartTs = (() => {
		if (phase === "pre") return new Date(config.start).getTime();
		if (phase === "racing" && state.currentLap) {
			const start = lapStartTs(config, state.currentLap);
			return start + lapDurationSecs(config, state.currentLap) * 1000;
		}
		return null;
	})();

	const isAlarming = phase === "racing" && (state.secsLeft ?? 999) <= 30;

	return (
		<div
			className={clsx(
				"relative flex flex-col items-center justify-center bg-black overflow-hidden",
				isAlarming && "animate-[alarm_0.5s_ease-in-out_infinite]",
			)}
		>
			{/* Pulse rings */}
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="absolute rounded-full border border-lime-300/5 w-[65vh] h-[65vh]"
					style={{ animation: `ringpulse 3s ease-in-out ${i}s infinite` }}
				/>
			))}

			<span className="font-mono text-xs tracking-[0.4em] text-neutral-500 uppercase z-10 mb-1">
				{label}
			</span>

			<span
				className={clsx(
					"font-black z-10 tabular-nums leading-none",
					colorClass,
				)}
				style={{ fontSize: "clamp(5rem, 17vh, 16rem)" }}
			>
				{digits}
			</span>

			{nextStartTs && (
				<div className="flex items-baseline gap-3 mt-4 z-10">
					<span className="font-mono text-xs tracking-widest text-neutral-500">
						NÄSTA START
					</span>
					<span className="font-mono text-3xl">
						{formatTimestamp(nextStartTs)}
					</span>
				</div>
			)}

			{/* Progress bar */}
			<div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-800">
				<div
					className={clsx(
						"h-full transition-[width] duration-1000 ease-linear",
						barColor,
					)}
					style={{ width: `${pct * 100}%` }}
				/>
			</div>
		</div>
	);
}
