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
			style={{
				background: isAlarming
					? undefined
					: "radial-gradient(ellipse at center, rgba(190,242,100,0.04) 0%, transparent 70%)",
			}}
		>
			{/* Pulse rings */}
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="absolute rounded-full border border-lime-300/10 w-[65vh] h-[65vh]"
					style={{ animation: `ringpulse 3s ease-in-out ${i}s infinite` }}
				/>
			))}

			<span className="font-mono text-sm tracking-[0.4em] text-neutral-400 uppercase z-10 mb-2">
				{label}
			</span>

			<span
				className={clsx(
					"font-black z-10 tabular-nums leading-none",
					colorClass,
				)}
				style={{
					fontSize: "clamp(7rem, 24vh, 28rem)",
					textShadow:
						phase !== "racing" || (state.secsLeft ?? 999) > 90
							? "0 0 40px rgba(190,242,100,0.4), 0 0 80px rgba(190,242,100,0.15)"
							: (state.secsLeft ?? 999) <= 30
								? "0 0 30px rgba(239,68,68,0.6)"
								: "0 0 30px rgba(251,146,60,0.5)",
				}}
			>
				{digits}
			</span>

			{nextStartTs && (
				<div className="flex items-baseline gap-3 mt-6 z-10">
					<span className="font-mono text-sm tracking-widest text-neutral-400 uppercase">
						NÄSTA START
					</span>
					<span className="font-mono font-bold text-5xl">
						{formatTimestamp(nextStartTs)}
					</span>
				</div>
			)}

			{/* Progress bar */}
			<div className="absolute bottom-0 left-0 right-0 h-3 bg-neutral-800/60">
				<div
					className={clsx(
						"h-full transition-[width] duration-1000 ease-linear",
						barColor,
					)}
					style={{
						width: `${pct * 100}%`,
						boxShadow:
							phase === "racing"
								? (state.secsLeft ?? 999) <= 30
									? "0 0 10px rgba(239,68,68,0.9)"
									: (state.secsLeft ?? 999) <= 90
										? "0 0 10px rgba(251,146,60,0.9)"
										: "0 0 10px rgba(190,242,100,0.7)"
								: "0 0 8px rgba(190,242,100,0.4)",
					}}
				/>
			</div>
		</div>
	);
}
