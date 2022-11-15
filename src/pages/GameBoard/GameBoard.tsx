import { BoardBuilder } from "@components/minegame";
import { Backdrop, ModalDataFeeder } from "@components/ui";
import { BoardProvider } from "@contexts/BoardProvider";
import { ModalProvider } from "@contexts/ModalProvider";
import { GameSidebar } from "@layouts/GameSidebar/GameSidebar";

import styles from "./GameBoard.module.css";

export function GameBoard() {
	return <BoardProvider>
		<ModalProvider>
			<section className={styles.gameContainer}>
				<section className={styles.boardSection}>
					<BoardBuilder />
					<Backdrop />
				</section>
				<GameSidebar />
				<ModalDataFeeder />
			</section>
		</ModalProvider>
	</BoardProvider>
}
