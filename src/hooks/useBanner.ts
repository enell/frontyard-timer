import { useEffect, useRef, useState } from "react";
import type { RaceConfig, RaceState } from "../types/race";

export interface BannerState {
	message: string;
	visible: boolean;
}

function getBannerMessage(
	state: RaceState,
	config?: RaceConfig,
): string | null {
	if (state.phase === "pre") {
		if (state.secsToStart === 300)
			return "5 MINUTER TILL START — FÖRBERED DIG!";
		if (state.secsToStart === 60) return "1 MINUT KVAR — GÅ TILL STARTLINJEN!";
		if (state.secsToStart === 10) return "10 — 9 — 8 — ALLA VID STARTEN!";
	}
	if (state.phase === "racing") {
		const { secsLeft, lapDurationSecs, currentLap } = state;
		if (secsLeft === (lapDurationSecs ?? 0) - 1) {
			const lapsDone = (currentLap ?? 1) - 1;
			const totalKm = config
				? (lapsDone * config.distanceKm).toFixed(1).replace(".", ",")
				: null;
			const kmPart = totalKm ? ` — ${totalKm} KM KLARA` : "";
			return `VARV ${currentLap} STARTAR — LÖP!${kmPart}`;
		}
		if (secsLeft === 120) return "2 MINUTER — GÖR DIG REDO!";
		if (secsLeft === 60) return "1 MINUT — STÄLL DIG VID STARTLINJEN!";
		if (secsLeft === 10) return "10 SEKUNDER — ALLA VID STARTEN!";
	}
	if (state.phase === "done")
		return "FANTASTISKT — LOPPET ÄR KLART! GRATTIS ALLA!";
	return null;
}

export function useBanner(
	state: RaceState,
	durationMs = 4000,
	config?: RaceConfig,
): BannerState {
	const [banner, setBanner] = useState<BannerState>({
		message: "",
		visible: false,
	});
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const lastKeyRef = useRef("");

	useEffect(() => {
		const key = `${state.phase}-${state.currentLap ?? 0}-${state.secsToStart ?? 0}-${state.secsLeft ?? 0}`;
		if (key === lastKeyRef.current) return;
		lastKeyRef.current = key;

		const msg = getBannerMessage(state, config);
		if (!msg) return;

		setBanner({ message: msg, visible: true });
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(
			() => setBanner((b) => ({ ...b, visible: false })),
			state.phase === "done" ? 15000 : durationMs,
		);
	}, [state, durationMs, config]);

	useEffect(
		() => () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		},
		[],
	);

	return banner;
}
