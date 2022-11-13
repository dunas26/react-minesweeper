import { BoardBuilder } from "@components/minegame";
import { BoardProvider } from "@contexts/BoardProvider";
import { GameSidebar } from "@layouts/GameSidebar/GameSidebar";

import styles from "./GameBoard.module.css";

export function GameBoard() {
	return <BoardProvider>
		<section className={styles.gameContainer}>
			<BoardBuilder />
			<GameSidebar />
		</section>
	</BoardProvider>
}
