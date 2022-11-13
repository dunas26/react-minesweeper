import { KPICard } from "@components/ui";

import styles from "./GameSidebar.module.css";

export function GameSidebar() {
	return <section className={styles.sidebarContainer}>
		<div className={styles.viewport}>
			<KPICard value={{ flags: 4, mines: 10 }} label="Flags / Mines" display={({ flags, mines }) => `${flags} / ${mines}`} colorClass="text-green-500" />
			<KPICard value={1250} label="Game score" display={(score) => `${score}`} colorClass="text-red-500" />
			<KPICard value={Math.random() * 12000} label="Game score" display={(time) => new Date(time * 1000).toISOString().substring(14, 19)} colorClass="text-red-500" />
		</div>
	</section>
}
