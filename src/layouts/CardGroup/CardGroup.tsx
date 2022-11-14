import { Title } from "@components/ui";
import { ReactElement } from "react";
import styles from "./CardGroup.module.css";

export interface CardGroupProps {
	children?: ReactElement | ReactElement[];
	title: string;
	subtitle?: string;
}

export function CardGroup({ children, title, subtitle }: CardGroupProps) {
	return <section className={styles.cardGroupContainer}>
		<header>
			<Title title={title} subtitle={subtitle} />
		</header>
		<main className={styles.contents}>
			{!!children && children}
		</main>
	</section>
}
