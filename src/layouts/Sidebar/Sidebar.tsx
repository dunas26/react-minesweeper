import { ReactElement, useState } from "react";
import { Divider, Title } from "@components/ui";

import styles from "./Sidebar.module.css";
import { BsChevronCompactLeft } from "react-icons/bs";

export interface SidebarProps {
	children?: (expanded: boolean) => ReactElement | ReactElement[]
	onExpandChange: (expanded: boolean) => void;
}

export function Sidebar({ children, onExpandChange = () => { } }: SidebarProps) {

	const [expanded, setExpanded] = useState(true);

	function handleExpandChange() {
		const newExpanded = !expanded;
		setExpanded(newExpanded);
		onExpandChange(newExpanded);
	}

	return <aside className={`${styles.sidebarContainer} ${expanded ? styles.expanded : ""}`} >
		<main>
			{expanded && <>
				<header>
					<Title title="Welcome" />
				</header>
				<Divider bottom={16} />
			</>}
			<section className={styles.buttonSection}>
				{!!children && children(expanded)}
			</section>
		</main>
		<div className={`${styles.resizer} ${expanded ? styles.expanded : ""}`} onClick={handleExpandChange}>
			<BsChevronCompactLeft className="w-10 -mx-2 h-auto text-cyan-600" />
		</div>
	</aside>
}
