import { clsx } from "clsx";
import { useEffect, useRef } from "react";
import { formatTempo } from "../lib/format";
import { buildLapSchedule, maxLaps } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";

interface LapScheduleProps {
	config: RaceConfig;
	state: RaceState;
}

export function LapSchedule({ config, state }: LapScheduleProps) {
	const currentLap = state.phase === "racing" ? (state.currentLap ?? 1) : null;
	const mx = maxLaps(config);
	const laps = buildLapSchedule(config, mx);
	const currentRowRef = useRef<HTMLTableRowElement>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: currentLap is the trigger for re-scrolling to the current row
	useEffect(() => {
		currentRowRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, [currentLap]);

	return (
		<div className="h-full flex flex-col bg-black border-r border-neutral-800 overflow-hidden">
			<div className="px-3 py-2 border-b border-neutral-800 text-neutral-500 text-xs font-mono tracking-widest flex-shrink-0">
				LAPS
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="w-full text-xs font-mono">
					<thead className="sticky top-0 bg-black border-b border-neutral-800">
						<tr>
							<th className="text-left px-3 py-1 text-neutral-500 font-normal">
								Lap
							</th>
							<th className="text-right px-3 py-1 text-neutral-500 font-normal">
								Time
							</th>
							<th className="text-right px-3 py-1 text-neutral-500 font-normal">
								Tempo
							</th>
						</tr>
					</thead>
					<tbody>
						{laps.map(({ lap, durationSecs }) => {
							const isNow = state.phase === "racing" && lap === currentLap;
							const isPast =
								(state.phase === "racing" &&
									currentLap !== null &&
									lap < currentLap) ||
								state.phase === "done";
							return (
								<tr
									key={lap}
									ref={isNow ? currentRowRef : undefined}
									className={clsx(
										"border-b border-neutral-900",
										isNow && "bg-white text-black",
										isPast && !isNow && "opacity-30",
									)}
								>
									<td
										className={clsx(
											"px-3 py-1.5 font-bold",
											!isNow && "text-neutral-300",
										)}
									>
										{lap}
									</td>
									<td
										className={clsx(
											"px-3 py-1.5 text-right",
											!isNow && "text-neutral-300",
										)}
									>
										{Math.ceil(durationSecs / 60)} min
									</td>
									<td
										className={clsx(
											"px-3 py-1.5 text-right",
											!isNow && "text-neutral-400",
										)}
									>
										{formatTempo(durationSecs, config.distanceKm)}
										<span className="ml-0.5 text-neutral-600">/km</span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
