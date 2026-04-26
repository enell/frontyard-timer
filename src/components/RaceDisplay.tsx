import { useBanner } from "../hooks/useBanner";
import { useClock } from "../hooks/useClock";
import { useRequiredRaceConfig } from "../hooks/useRaceConfig";
import { useRaceState } from "../hooks/useRaceState";
import { Banner } from "./Banner";
import { BottomBar } from "./BottomBar";
import { LapSchedule } from "./LapSchedule";
import { StatsPanel } from "./StatsPanel";
import { TimerDisplay } from "./TimerDisplay";
import { TopBar } from "./TopBar";

export function RaceDisplay() {
	const config = useRequiredRaceConfig();
	const now = useClock();
	const state = useRaceState(config);
	const banner = useBanner(state);

	const lapBadge = (() => {
		if (state.phase === "pre") return "STARTAR SNART";
		if (state.phase === "done") return "KLART";
		return `VARV ${state.currentLap}`;
	})();

	return (
		<div
			className="w-screen h-screen overflow-hidden grid bg-black text-white"
			style={{ gridTemplateRows: "10vh 58vh 1fr" }}
		>
			<Banner message={banner.message} visible={banner.visible} />
			<TopBar now={now} lapBadge={lapBadge} />
			<div
				className="grid overflow-hidden"
				style={{ gridTemplateColumns: "22vw 1fr 22vw" }}
			>
				<LapSchedule config={config} state={state} />
				<TimerDisplay config={config} state={state} />
				<StatsPanel config={config} state={state} />
			</div>
			<BottomBar config={config} state={state} />
		</div>
	);
}
