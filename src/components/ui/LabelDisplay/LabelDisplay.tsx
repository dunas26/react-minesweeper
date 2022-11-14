import MessageService from "@services/Message.service";
import styles from "./LabelDisplay.module.css";

export interface LabelDisplayProps {
	label: string;
	value: string;
}

export function LabelDisplay({ label, value }: LabelDisplayProps) {
	return <article className={styles.labelContainer}>
		<p className={styles.label}>{label}:</p>
		{!!value ? <p className={styles.value}>{value}</p> : <p className={styles.placeholder}>{MessageService.getMessage("no_value")}</p>}
	</article>
}
