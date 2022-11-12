import { BoardProvider } from "@contexts/BoardProvider";
import { BoardBuilder } from "@components/minegame/BoardBuilder";

export function App() {

	return (
		<div className="App">
			<BoardProvider>
				<BoardBuilder />
			</BoardProvider>
		</div>
	)
}
