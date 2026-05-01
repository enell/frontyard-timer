import { useRequiredRaceConfig } from "../hooks/useRaceConfig";
import { useRaceState } from "../hooks/useRaceState";
import { LapSchedule } from "./LapSchedule";
import { TimerDisplay } from "./TimerDisplay";

export function RaceDisplay() {
	const config = useRequiredRaceConfig();
	const state = useRaceState(config);

	return (
		<div className="w-full h-full overflow-hidden flex portrait:flex-col landscape:flex-row bg-black text-white">
			<div className="portrait:block portrait:order-2 portrait:h-1/3 portrait:flex-none landscape:hidden sm:landscape:block landscape:w-1/3 landscape:lg:w-1/4 landscape:min-w-40 landscape:flex-shrink-0 landscape:h-full">
				<LapSchedule config={config} state={state} />
			</div>
			<div className="flex-1 portrait:order-1 landscape:h-full">
				<TimerDisplay config={config} state={state} />
			</div>
		</div>
	);
}
