import { Divider, Title } from "@components/ui";
import { ReactElement } from "react";
import styles from "./CardGroup.module.css";

export interface CardGroupProps {
	children?: ReactElement | ReactElement[];
	title: string;
	subtitle?: string;
	hide?: boolean
}

export function CardGroup({ children, title, subtitle, hide = false }: CardGroupProps) {
	return <section className={`${styles.cardGroupContainer} ${hide ? styles.hidden : ""}`}>
		<header>
			<Title title={title} subtitle={subtitle} size="xs" titleStyle="low-emphasis" />
			<Divider />
		</header>
		<main className={styles.contents}>
			{!!children && children}
		</main>
	</section>
}
