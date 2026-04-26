import { formatWallClock, formatWallDate } from "../lib/format";

interface TopBarProps {
	now: Date;
	lapBadge: string;
}

export function TopBar({ now, lapBadge }: TopBarProps) {
	return (
		<div
			className="flex items-center justify-between px-6 bg-neutral-900 border-b border-neutral-800 h-full"
			style={{ boxShadow: "0 1px 0 rgba(190,242,100,0.08)" }}
		>
			<span
				className="font-black text-3xl tracking-widest text-lime-300 uppercase"
				style={{ textShadow: "0 0 20px rgba(190,242,100,0.4)" }}
			>
				Frontyard Ultra
			</span>
			<span
				className="bg-lime-300 text-black font-black text-3xl px-8 py-1 tracking-widest rounded-sm"
				style={{ boxShadow: "0 0 20px rgba(190,242,100,0.5)" }}
			>
				{lapBadge}
			</span>
			<div className="text-right">
				<div className="font-mono font-bold text-3xl tracking-wider">
					{formatWallClock(now)}
				</div>
				<div className="font-mono text-sm text-neutral-400 tracking-wide">
					{formatWallDate(now)}
				</div>
			</div>
		</div>
	);
}
