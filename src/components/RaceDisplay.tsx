import { useRequiredRaceConfig } from "../hooks/useRaceConfig";
import { useRaceState } from "../hooks/useRaceState";
import { LapSchedule } from "./LapSchedule";
import { TimerDisplay } from "./TimerDisplay";

export function RaceDisplay() {
	const config = useRequiredRaceConfig();
	const state = useRaceState(config);

	return (
		<div className="w-screen h-screen overflow-hidden flex bg-black text-white">
			<div className="hidden sm:block w-1/4 min-w-40 flex-shrink-0 h-full">
				<LapSchedule config={config} state={state} />
			</div>
			<div className="flex-1 h-full">
				<TimerDisplay config={config} state={state} />
			</div>
		</div>
	);
}
