import { ConfigForm } from "./components/ConfigForm";
import { RaceDisplay } from "./components/RaceDisplay";
import { useRaceConfig } from "./hooks/useRaceConfig";

function App() {
	const config = useRaceConfig();
	if (!config) return <ConfigForm />;
	return <RaceDisplay />;
}

export default App;
