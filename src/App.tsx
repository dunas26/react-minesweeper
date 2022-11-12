import { BoardProvider } from "@contexts/BoardProvider";
import { BoardBuilder } from "@components/minegame";
import { Main } from "@layouts";

export function App() {

	return (
		<div className="App">
			<Main />
			<BoardProvider>
				<BoardBuilder />
			</BoardProvider>
		</div>
	)
}
