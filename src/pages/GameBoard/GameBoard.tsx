import { BoardBuilder } from "@components/minegame";
import { Backdrop } from "@components/ui";
import { BoardProvider } from "@contexts/BoardProvider";
import { GameSidebar } from "@layouts/GameSidebar/GameSidebar";

import styles from "./GameBoard.module.css";

export function GameBoard() {
	return <BoardProvider>
		<section className={styles.gameContainer}>
			<section className={styles.boardSection}>
				<BoardBuilder />
				<Backdrop />
			</section>
			<GameSidebar />
		</section>
	</BoardProvider>
}
