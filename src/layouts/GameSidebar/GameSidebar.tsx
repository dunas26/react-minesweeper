import { useState } from "react";
import { AiOutlineAppstore, AiOutlineNumber, AiOutlinePlusCircle, AiOutlineReload } from "react-icons/ai";
import { MdOutlineFlag } from "react-icons/md"

import { BigToggle, Button, KPICard, LabelDisplay } from "@components/ui";
import { CardGroup } from "@layouts";

import styles from "./GameSidebar.module.css";

export function GameSidebar() {

	const [mode, setMode] = useState<"normal" | "spread" | "flag">("normal")

	return <section className={styles.sidebarContainer}>
		<div className={styles.viewport}>
			<CardGroup title="Game Information">
				<section className="grid grid-cols-1 grid-rows-1 xl:grid-cols-2 xl:grid-rows-2 gap-4">
					<KPICard value={{ flags: 4, mines: 10 }} label="Flags / Mines" display={({ flags, mines }) => `${flags} / ${mines}`} colorClass="text-green-500" layoutClass="col-start-1 col-end-2 xl:col-end-3" />
					<KPICard value={1250} label="Game score" display={(score) => `${score}`} colorClass="text-red-500" />
					<KPICard value={Math.random() * 12000} label="Current Game Time" display={(time) => new Date(time * 1000).toISOString().substring(14, 19)} colorClass="text-cyan-600" />
				</section>
			</CardGroup>
			<CardGroup title="Board Actions">
				<section className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full">
					<Button label="Start new game" icon={<AiOutlinePlusCircle className="w-8 h-auto text-cyan-500" />} />
					<Button label="Reset the board" icon={<AiOutlineReload className="w-8 h-auto text-cyan-500" />} />
				</section>
			</CardGroup>
			<CardGroup title="Click Mode">
				<section className="grid grid-cols-1 xl:grid-cols-3 gap-2">
					<BigToggle on={mode == "normal"} click={() => setMode("normal")} label="Normal click mode" icon={<AiOutlineNumber className="w-8 h-auto" />} />
					<BigToggle on={mode == "spread"} click={() => setMode("spread")} label="Spread open mode" icon={<AiOutlineAppstore className="w-8 h-auto" />} />
					<BigToggle on={mode == "flag"} click={() => setMode("flag")} label="Spread open mode" icon={<MdOutlineFlag className="w-8 h-auto" />} />
				</section>
			</CardGroup>
			<CardGroup title="Board Details">
				<section>
					<LabelDisplay label="Semilla" value="asdf123456789" />
				</section>
			</CardGroup>
		</div>
	</section>
}
