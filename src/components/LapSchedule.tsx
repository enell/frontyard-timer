import { clsx } from "clsx";
import { formatTimestampHHMM } from "../lib/format";
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

	return (
		<div className="flex flex-col bg-neutral-900 border-r border-neutral-800 overflow-hidden">
			<div className="px-4 py-2 bg-black border-b border-neutral-800 font-mono text-xs tracking-widest text-neutral-500">
				{"// VARVSCHEMA"}
			</div>
			<div className="flex-1 overflow-hidden flex flex-col">
				{laps.map(({ lap, durationSecs }) => {
					const isNow = state.phase === "racing" && lap === currentLap;
					const isPast = lap < currentLap;
					const startTs = lapStartTs(config, lap);
					return (
						<div
							key={lap}
							className={clsx(
								"grid grid-cols-3 px-4 py-2 border-b border-neutral-800/60 items-center text-sm",
								isNow && "bg-lime-300/5",
								isPast && "opacity-25",
							)}
						>
							<span
								className={clsx(
									"font-mono text-xs",
									isNow ? "text-lime-300" : "text-neutral-500",
								)}
							>
								{isNow ? (
									<span className="bg-lime-300 text-black px-1 text-[0.65rem]">
										NU
									</span>
								) : (
									`#${lap}`
								)}
							</span>
							<span
								className={clsx(
									"font-bold text-center",
									isNow && "text-lime-300",
								)}
							>
								{Math.ceil(durationSecs / 60)} min
							</span>
							<span
								className={clsx(
									"font-mono text-xs text-right",
									isNow ? "text-white" : "text-neutral-500",
								)}
							>
								{formatTimestampHHMM(startTs)}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
