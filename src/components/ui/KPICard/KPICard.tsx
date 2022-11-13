import styles from "./KPICard.module.css";

export interface KPICardProps<T> {
	value: T,
	label?: string,
	display?: (value: T) => string;
	colorClass?: string;
}

export function KPICard<T>({ value, label = undefined, display = (value) => `${value}`, colorClass = "text-zinc-400" }: KPICardProps<T>) {
	return <article className={styles.cardContainer}>
		<p className={styles.value}>{display(value)}</p>
		<p className={`${colorClass} ${styles.label}`}>{label}</p>
	</article>
}
