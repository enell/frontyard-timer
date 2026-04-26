import { formatHHMMSS, pad2 } from "../lib/format";
import { maxLaps } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";

interface BottomBarProps {
	config: RaceConfig;
	state: RaceState;
}

export function BottomBar({ config, state }: BottomBarProps) {
	const startDate = new Date(config.start);
	const startHHMM = `${pad2(startDate.getHours())}:${pad2(startDate.getMinutes())}`;
	const mx = maxLaps(config);
	const done = state.lapsDone ?? 0;
	const totalKm = (done * config.distanceKm).toFixed(1);
	const elapsed = state.totalElapsedSecs ?? 0;

	return (
		<div
			className="grid grid-cols-3 bg-neutral-900 overflow-hidden"
			style={{ boxShadow: "inset 0 1px 0 rgba(190,242,100,0.08)" }}
		>
			<div className="flex flex-col justify-center px-6 py-3 border-r border-neutral-800">
				<span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
					Total löptid
				</span>
				<span
					className="font-black text-5xl leading-none text-lime-300"
					style={{ textShadow: "0 0 20px rgba(190,242,100,0.3)" }}
				>
					{formatHHMMSS(elapsed)}
				</span>
				<span className="font-mono text-xs text-neutral-600">
					{state.phase === "pre"
						? "Loppet ej startat"
						: state.phase === "done"
							? "Avslutat"
							: "Sedan start"}
				</span>
			</div>

			<div className="flex flex-col items-center justify-center border-r border-neutral-800 py-3">
				<span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
					Startskott
				</span>
				<span className="font-mono font-bold text-5xl">{startHHMM}</span>
				<span className="font-mono text-xs text-neutral-600">
					{config.distanceKm.toFixed(1).replace(".", ",")} km/varv
				</span>
			</div>

			<div className="flex flex-col justify-center px-6 py-3">
				<span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">
					Varv klara / max
				</span>
				<div className="flex items-baseline gap-2 leading-none">
					<span className="font-black text-5xl text-green-400">{done}</span>
					<span className="text-2xl text-neutral-600">/</span>
					<span className="font-black text-5xl text-orange-400">{mx}</span>
				</div>
				<span className="font-mono text-xs text-neutral-600">
					{totalKm} km totalt
				</span>
			</div>
		</div>
	);
}
