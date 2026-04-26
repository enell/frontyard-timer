import { useSetAtom } from "jotai";
import { useState } from "react";
import { setRaceConfigAtom } from "../atoms/race-config.atom";
import type { RaceConfig } from "../types/race";

function todayAt(hh: number, mm: number): string {
	const d = new Date();
	const pad = (n: number) => String(n).padStart(2, "0");
	return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(hh)}:${pad(mm)}`;
}

export function ConfigForm() {
	const setRaceConfig = useSetAtom(setRaceConfigAtom);
	const [start, setStart] = useState(todayAt(10, 0));
	const [first, setFirst] = useState(30);
	const [dec, setDec] = useState(1);
	const [dist, setDist] = useState(3.0);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const config: RaceConfig = {
			start,
			firstLapMinutes: first,
			decrementMinutes: dec,
			distanceKm: dist,
		};
		setRaceConfig(config);
	}

	return (
		<div className="min-h-screen bg-neutral-950 flex items-center justify-center p-8">
			<div
				className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
				style={{
					boxShadow:
						"0 0 40px rgba(190,242,100,0.06), 0 25px 50px rgba(0,0,0,0.6)",
				}}
			>
				<div className="border-b border-neutral-800 pb-4">
					<h1
						className="font-black text-2xl tracking-widest text-lime-300 uppercase"
						style={{ textShadow: "0 0 20px rgba(190,242,100,0.5)" }}
					>
						Frontyard Ultra
					</h1>
					<p className="font-mono text-xs tracking-[0.2em] text-neutral-500 mt-1">
						{"// INSTÄLLNINGAR"}
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<Field label="Startdatum & tid">
						<input
							type="datetime-local"
							value={start}
							onChange={(e) => setStart(e.target.value)}
							className="bg-black border border-neutral-700 rounded text-white font-mono text-sm px-3 py-2 w-full focus:outline-none focus:border-lime-300 focus:shadow-[0_0_0_1px_rgba(190,242,100,0.3)] transition-shadow"
							required
						/>
					</Field>
					<Field label="Varv 1 tid (min)">
						<input
							type="number"
							value={first}
							min={1}
							max={120}
							onChange={(e) => setFirst(Number(e.target.value))}
							className="bg-black border border-neutral-700 rounded text-white font-mono text-sm px-3 py-2 w-32 focus:outline-none focus:border-lime-300 focus:shadow-[0_0_0_1px_rgba(190,242,100,0.3)] transition-shadow"
						/>
					</Field>
					<Field label="Minskning/varv (min)">
						<input
							type="number"
							value={dec}
							min={0}
							max={20}
							step={0.5}
							onChange={(e) => setDec(Number(e.target.value))}
							className="bg-black border border-neutral-700 rounded text-white font-mono text-sm px-3 py-2 w-32 focus:outline-none focus:border-lime-300 focus:shadow-[0_0_0_1px_rgba(190,242,100,0.3)] transition-shadow"
						/>
					</Field>
					<Field label="Banlängd (km)">
						<input
							type="number"
							value={dist}
							min={0.1}
							step={0.1}
							onChange={(e) => setDist(Number(e.target.value))}
							className="bg-black border border-neutral-700 rounded text-white font-mono text-sm px-3 py-2 w-32 focus:outline-none focus:border-lime-300 focus:shadow-[0_0_0_1px_rgba(190,242,100,0.3)] transition-shadow"
						/>
					</Field>

					<div className="bg-lime-300/5 border-l-2 border-lime-300 rounded-r px-4 py-3 font-mono text-xs text-neutral-400 leading-relaxed">
						Inställningarna sparas som query params.
						<br />
						Bokmärk länken — displayen startar automatiskt.
					</div>

					<button
						type="submit"
						className="bg-lime-300 text-black font-black text-lg tracking-widest py-3 rounded hover:bg-lime-200 active:scale-[0.98] transition-all uppercase"
						style={{ boxShadow: "0 0 20px rgba(190,242,100,0.25)" }}
					>
						Spara & starta display
					</button>
				</form>
			</div>
		</div>
	);
}

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex items-center justify-between gap-4">
			<span className="font-mono text-xs tracking-wide text-neutral-400 flex-1">
				{label}
			</span>
			{children}
		</div>
	);
}
