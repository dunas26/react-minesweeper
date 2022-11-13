import { ReactElement } from "react"

import styles from "./SidebarButton.module.css";

export interface SidebarButtonProps {
	label: string;
	icon?: ReactElement;
	click?: () => void;
}

export function SidebarButton({ label, icon = undefined, click = () => { } }: SidebarButtonProps) {
	function handleClick() {
		click();
	}
	return <button className={styles.buttonContainer} onClick={handleClick}><i>{!!icon && icon}</i>{label}</button>
}
