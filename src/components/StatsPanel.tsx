import { lapDurationSecs, maxLaps } from "../lib/race";
import type { RaceConfig, RaceState } from "../types/race";

interface StatBlockProps {
	label: string;
	value: string | number;
	sub: string;
	valueClass?: string;
}

function StatBlock({
	label,
	value,
	sub,
	valueClass = "text-white",
}: StatBlockProps) {
	return (
		<div className="flex-1 flex flex-col justify-center px-5 border-b border-neutral-800 last:border-b-0">
			<span className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-1">
				{label}
			</span>
			<span className={`font-black text-6xl leading-none ${valueClass}`}>
				{value}
			</span>
			<span className="font-mono text-xs text-neutral-500 mt-1">{sub}</span>
		</div>
	);
}

interface StatsPanelProps {
	config: RaceConfig;
	state: RaceState;
}

export function StatsPanel({ config, state }: StatsPanelProps) {
	const lap = state.phase === "racing" ? (state.currentLap ?? 1) : 1;
	const dur = Math.ceil(lapDurationSecs(config, lap) / 60);
	const mx = maxLaps(config);

	return (
		<div className="flex flex-col bg-neutral-900 border-l border-neutral-800 overflow-hidden">
			<div className="px-4 py-2 bg-black border-b border-neutral-800 font-mono text-xs tracking-widest text-neutral-500">
				{"// STATS"}
			</div>
			<StatBlock
				label="Varv"
				value={state.phase === "racing" ? lap : "—"}
				sub="Aktuellt"
				valueClass="text-lime-300"
			/>
			<StatBlock label="Varvtid" value={`${dur} min`} sub="Tillgänglig tid" />
			<StatBlock
				label="Max varv"
				value={mx}
				sub="Om varvtid → 0"
				valueClass="text-orange-400"
			/>
		</div>
	);
}
