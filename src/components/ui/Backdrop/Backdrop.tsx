import { BoardStateContext } from "@contexts/BoardProvider";
import MessageService from "@services/Message.service";
import { useContext, useEffect, useState } from "react";
import styles from "./Backdrop.module.css";

export function Backdrop() {
	const [active, setActive] = useState(false);
	const state = useContext(BoardStateContext);

	useEffect(() => {
		const { gamestate } = state;
		setActive(gamestate == "gameover" || gamestate == "preparing")
	}, [state.gamestate])

	return <>
		{active && <div className={styles.backdrop}>
			<p className={styles.message}>{MessageService.getMessage(`game_${state.gamestate}`)}</p>
		</div>}
	</>
}
