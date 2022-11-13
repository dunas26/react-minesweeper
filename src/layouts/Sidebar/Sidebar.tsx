import { ReactElement } from "react";
import { Divider, Title } from "@components/ui";
import styles from "./Sidebar.module.css";

export interface SidebarProps {
	children?: ReactElement | ReactElement[]
}

export function Sidebar({ children }: SidebarProps) {
	return <aside className={styles.sidebarContainer} >
		<header>
			<Title title="Welcome" />
		</header>
		<Divider bottom={16} />
		<section className={styles.buttonSection}>
			{children}
		</section>
	</aside>
}
