import { ReactElement } from "react";
import styles from "./Title.module.css";

export type TitleSize = "md" | "sm" | "xs";
export type TitleStyle = "normal" | "low-emphasis";

export interface TitleProps {
	title: string;
	subtitle?: string;
	size?: TitleSize;
	titleStyle?: TitleStyle;
	icon?: ReactElement;
}

export function Title({ title, subtitle, size = "md", titleStyle = "normal", icon = undefined }: TitleProps) {

	const sizeClasses: { [key: string]: string } = {
		"md": styles.mdType,
		"sm": styles.smType,
		"xs": styles.xsType,
	};

	const titleStyleClasses: { [key: string]: string } = {
		"normal": styles.titleNormal,
		"low-emphasis": styles.lowEmphasis
	}

	const titleClass = `${sizeClasses[size]} ${styles.title} ${titleStyleClasses[titleStyle]}`
	const subtitleClass = `${sizeClasses[size]} ${styles.subtitle}`

	return <article className={styles.titleContainer}>
		{!!icon &&
			<section className={styles.iconSection}>
				{icon}
			</section>
		}
		<section className={styles.headingsSection}>
			<p className={titleClass}>{title}</p>
			{!!subtitle && <p className={subtitleClass}>{subtitle}</p>}
		</section>
	</article>
}

