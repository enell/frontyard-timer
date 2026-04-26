import { clsx } from "clsx";
import { formatHHMMSS, pad2 } from "../lib/format";
import type { RaceConfig, RaceState } from "../types/race";

interface BottomBarProps {
	config: RaceConfig;
	state: RaceState;
}

export function BottomBar({ config, state }: BottomBarProps) {
	const startDate = new Date(config.start);
	const startHHMM = `${pad2(startDate.getHours())}:${pad2(startDate.getMinutes())}`;
	const elapsed = state.totalElapsedSecs ?? 0;
	const isRacing = state.phase === "racing";

	return (
		<div
			className={clsx(
				"grid grid-cols-2 bg-neutral-900 overflow-hidden transition-opacity duration-500",
				isRacing && "opacity-40",
			)}
			style={{ boxShadow: "inset 0 1px 0 rgba(190,242,100,0.08)" }}
		>
			<div className="flex flex-col justify-center px-6 py-3 border-r border-neutral-800">
				<span className="font-mono text-sm tracking-widest text-neutral-400 uppercase">
					Total löptid
				</span>
				<span
					className="font-black text-6xl leading-none text-lime-300"
					style={{ textShadow: "0 0 20px rgba(190,242,100,0.3)" }}
				>
					{formatHHMMSS(elapsed)}
				</span>
				<span className="font-mono text-sm text-neutral-500">
					{state.phase === "pre"
						? "Loppet ej startat"
						: state.phase === "done"
							? "Avslutat"
							: "Sedan start"}
				</span>
			</div>

			<div className="flex flex-col items-center justify-center py-3">
				<span className="font-mono text-sm tracking-widest text-neutral-400 uppercase">
					Startskott
				</span>
				<span className="font-mono font-bold text-6xl">{startHHMM}</span>
				<span className="font-mono text-sm text-neutral-500">
					{config.distanceKm.toFixed(1).replace(".", ",")} km/varv
				</span>
			</div>
		</div>
	);
}
