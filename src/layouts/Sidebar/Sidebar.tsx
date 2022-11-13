import { ReactElement, useState } from "react";
import { Divider, Title } from "@components/ui";

import styles from "./Sidebar.module.css";

export interface SidebarProps {
	children?: (expanded: boolean) => ReactElement | ReactElement[]
}

export function Sidebar({ children }: SidebarProps) {

	const [expanded, setExpanded] = useState(false);

	return <aside className={`${styles.sidebarContainer} ${expanded ? styles.expanded : ""}`} >
		<main>
			{expanded &&
				<>
					<header>
						<Title title="Welcome" />
					</header>
					<Divider bottom={16} />
				</>
			}
			<section className={styles.buttonSection}>
				{!!children && children(expanded)}
			</section>
		</main>
		<div className={styles.resizer} onClick={() => setExpanded(prevExpanded => !prevExpanded)}></div>
	</aside>
}
