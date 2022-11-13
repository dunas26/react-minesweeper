import { BoardBuilder } from "@components/minegame";
import { BoardProvider } from "@contexts/BoardProvider";

export function GameBoard() {
	return <BoardProvider>
		<BoardBuilder />
	</BoardProvider>
}
