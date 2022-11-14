import { useContext, useEffect, useState } from "react";
import { AiOutlineAppstore, AiOutlineNumber, AiOutlinePlusCircle, AiOutlineReload } from "react-icons/ai";
import { MdOutlineFlag } from "react-icons/md"

import { BigToggle, Button, KPICard, LabelDisplay } from "@components/ui";
import { CardGroup } from "@layouts";

import styles from "./GameSidebar.module.css";
import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";

export function GameSidebar() {

	const [mode, setMode] = useState<"normal" | "spread" | "flag">("normal")
	const { gamestate } = useContext(BoardStateContext)
	const dispatch = useContext(BoardDispatcherContext)

	return <section className={styles.sidebarContainer}>
		<div className={styles.viewport}>
			<CardGroup title="Game Information" hide={gamestate == "gameover"}>
				<section className={styles.gameInformation}>
					<KPICard value={{ flags: 4, mines: 10 }} label="Flags / Mines" display={({ flags, mines }) => `${flags} / ${mines}`} colorClass="text-green-500" layoutClass={styles.flagMinesKpi} />
					<KPICard value={1250} label="Game score" display={(score) => `${score}`} colorClass="text-red-500" />
					<KPICard value={Math.random() * 12000} label="Current Game Time" display={(time) => new Date(time * 1000).toISOString().substring(14, 19)} colorClass="text-cyan-600" />
				</section>
			</CardGroup>
			<CardGroup title="Click Mode" hide={gamestate == "gameover"}>
				<section className={styles.clickMode}>
					<BigToggle on={mode == "normal"} click={() => setMode("normal")} label="Normal click mode" icon={<AiOutlineNumber className={`${styles.iconSize}`} />} />
					<BigToggle on={mode == "spread"} click={() => setMode("spread")} label="Spread open mode" icon={<AiOutlineAppstore className={`${styles.iconSize}`} />} />
					<BigToggle on={mode == "flag"} click={() => setMode("flag")} label="Flag only mode" icon={<MdOutlineFlag className={`${styles.iconSize}`} />} />
				</section>
			</CardGroup>
			<CardGroup title="Board Actions">
				<section className={styles.boardActions}>
					<Button click={() => dispatch({ type: "setup" })} label="Start new game" icon={<AiOutlinePlusCircle className={`${styles.iconSize} ${styles.boardIconColor}`} />} />
					<Button click={() => dispatch({ type: "reset" })} label="Reset the board" icon={<AiOutlineReload className={`${styles.iconSize} ${styles.boardIconColor}`} />} />
				</section>
			</CardGroup>
			<CardGroup title="Board Details" hide={gamestate == "gameover"}>
				<section>
					<LabelDisplay label="Seed" value="asdf123456789" />
				</section>
			</CardGroup>
		</div>
	</section>
}
