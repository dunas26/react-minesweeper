import { ReactElement } from "react";
import styles from "./Title.module.css";

export type TitleSize = "md";

export interface TitleProps {
	title: string;
	subtitle?: string;
	size?: TitleSize;
	icon?: ReactElement;
}

export function Title({ title, subtitle, size = "md", icon = undefined }: TitleProps) {

	const sizeClasses: { [key: string]: string } = {
		"md": styles.mdType
	};

	const titleClass = `${sizeClasses[size]} ${styles.title}`
	const subtitleClass = `${sizeClasses[size]} ${styles.subtitle}`

	return <article className={styles.titleContainer}>
		<section className={styles.iconSection}>
			{!!icon && icon}
		</section>
		<section className={styles.headingsSection}>
			<p className={titleClass}>{title}</p>
			{!!subtitle && <p className={subtitleClass}>{subtitle}</p>}
		</section>
	</article>
}

