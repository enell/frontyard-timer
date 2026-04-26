export function pad2(n: number): string {
	return String(Math.floor(Math.abs(n))).padStart(2, "0");
}

export function formatMMSS(secs: number): string {
	return `${pad2(secs / 60)}:${pad2(secs % 60)}`;
}

export function formatHHMMSS(secs: number): string {
	const h = Math.floor(secs / 3600);
	const m = Math.floor((secs % 3600) / 60);
	const s = secs % 60;
	return `${h}:${pad2(m)}:${pad2(s)}`;
}

export function formatDDHH(secs: number): string {
	const d = Math.floor(secs / 86400);
	const h = Math.floor((secs % 86400) / 3600);
	return `${d}d ${pad2(h)}h`;
}

export function formatTimestamp(ts: number): string {
	const d = new Date(ts);
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

export function formatTimestampHHMM(ts: number): string {
	const d = new Date(ts);
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function formatWallClock(d: Date): string {
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
}

export function formatTempo(durationSecs: number, distanceKm: number): string {
	const secsPerKm = durationSecs / distanceKm;
	const m = Math.floor(secsPerKm / 60);
	const s = Math.round(secsPerKm % 60);
	return `${m}:${pad2(s)}`;
}

export function formatWallDate(d: Date): string {
	const days = ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"];
	const months = [
		"jan",
		"feb",
		"mar",
		"apr",
		"maj",
		"jun",
		"jul",
		"aug",
		"sep",
		"okt",
		"nov",
		"dec",
	];
	return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}
