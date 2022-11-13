import { Divider, Title } from "@components/ui";
import styles from "./Sidebar.module.css";

export function Sidebar() {
	return <aside className={styles.sidebarContainer} >
		<Title title="Main menu" />
		<Divider />
	</aside>
}
