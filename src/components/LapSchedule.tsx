import { clsx } from "clsx";
import { formatPaceMinKm, formatTimestampHHMM } from "../lib/format";
import { buildLapSchedule, lapStartTs } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";

interface LapScheduleProps {
	config: RaceConfig;
	state: RaceState;
}

export function LapSchedule({ config, state }: LapScheduleProps) {
	const currentLap = state.phase === "racing" ? (state.currentLap ?? 1) : 1;
	const fromLap = Math.max(1, currentLap - 1);
	const laps = buildLapSchedule(config, fromLap + 10).filter(
		(l) => l.lap >= fromLap,
	);

	const nextLap = currentLap + 1;

	return (
		<div className="flex flex-col bg-neutral-900 border-r border-neutral-800 overflow-hidden">
			<div className="px-4 py-2 bg-black border-b border-neutral-800 font-mono text-xs tracking-widest text-neutral-400 grid grid-cols-4">
				<span>{"// VARVSCHEMA"}</span>
				<span className="text-center">TID</span>
				<span className="text-center">START</span>
				<span className="text-right">MIN/KM</span>
			</div>
			<div className="flex-1 overflow-hidden flex flex-col">
				{laps.map(({ lap, durationSecs }) => {
					const isNow = state.phase === "racing" && lap === currentLap;
					const isNext = state.phase === "racing" && lap === nextLap;
					const isPast = lap < currentLap;
					const startTs = lapStartTs(config, lap);
					const pace = formatPaceMinKm(durationSecs, config.distanceKm);
					return (
						<div
							key={lap}
							className={clsx(
								"grid grid-cols-4 px-4 py-3 border-b border-neutral-800/60 items-center transition-colors",
								isNow && "bg-lime-300/8 border-l-2 border-l-lime-300",
								isNext &&
									!isNow &&
									"bg-orange-400/5 border-l-2 border-l-orange-400/60",
								!isNow && !isNext && "border-l-2 border-l-transparent",
								isPast && "opacity-25",
							)}
						>
							<span
								className={clsx(
									"font-mono text-sm font-bold",
									isNow
										? "text-lime-300"
										: isNext
											? "text-orange-300"
											: "text-neutral-400",
								)}
							>
								{isNow ? (
									<span
										className="bg-lime-300 text-black px-2 py-0.5 text-sm font-black rounded-sm"
										style={{ boxShadow: "0 0 8px rgba(190,242,100,0.5)" }}
									>
										NU
									</span>
								) : (
									`#${lap}`
								)}
							</span>
							<span
								className={clsx(
									"font-black text-xl text-center",
									isNow
										? "text-lime-300"
										: isNext
											? "text-orange-300"
											: "text-white",
								)}
							>
								{Math.ceil(durationSecs / 60)} min
							</span>
							<span
								className={clsx(
									"font-mono text-sm font-bold text-center",
									isNow
										? "text-white"
										: isNext
											? "text-orange-200"
											: "text-neutral-400",
								)}
							>
								{formatTimestampHHMM(startTs)}
							</span>
							<span
								className={clsx(
									"font-mono text-sm font-bold text-right",
									isNow
										? "text-lime-300"
										: isNext
											? "text-orange-300"
											: "text-neutral-500",
								)}
							>
								{pace}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
