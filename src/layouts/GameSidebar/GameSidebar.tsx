import { KPICard } from "@components/ui";
import { CardGroup } from "@layouts";

import styles from "./GameSidebar.module.css";

export function GameSidebar() {
	return <section className={styles.sidebarContainer}>
		<div className={styles.viewport}>
			<CardGroup title="Game information">
				<section className="grid grid-cols-1 grid-rows-1 xl:grid-cols-2 xl:grid-rows-2 gap-4">
					<KPICard value={{ flags: 4, mines: 10 }} label="Flags / Mines" display={({ flags, mines }) => `${flags} / ${mines}`} colorClass="text-green-500" layoutClass="col-start-1 col-end-2 xl:col-end-3" />
					<KPICard value={1250} label="Game score" display={(score) => `${score}`} colorClass="text-red-500" />
					<KPICard value={Math.random() * 12000} label="Current Game Time" display={(time) => new Date(time * 1000).toISOString().substring(14, 19)} colorClass="text-cyan-600" />
				</section>
			</CardGroup>
		</div>
	</section>
}
