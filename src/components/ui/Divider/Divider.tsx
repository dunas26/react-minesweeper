import { CSSProperties } from "react";
import styles from "./Divider.module.css";

export interface DividerProps {
	top?: number;
	bottom?: number;
}

export function Divider({ top = 4, bottom = 4 }: DividerProps) {
	const inlineStyles: CSSProperties = {
		marginTop: `${top}px`,
		marginBottom: `${bottom}px`,
	}
	return <hr className={styles.hrContainer} style={inlineStyles} />
}
