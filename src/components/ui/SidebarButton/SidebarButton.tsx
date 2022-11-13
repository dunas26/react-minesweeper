import { ReactElement } from "react"

import styles from "./SidebarButton.module.css";

export interface SidebarButtonProps {
	label: string;
	icon?: ReactElement;
	click?: () => void;
	expanded?: boolean;
}

export function SidebarButton({ label, icon = undefined, click = () => { }, expanded = true }: SidebarButtonProps) {

	function expandedContents() {
		return <>
			<i>{!!icon && icon}</i>
			{label}
		</>
	}

	function dockedContents() {
		return <i>{!!icon && icon}</i>
	}

	function handleClick() {
		click();
	}

	return <button className={`${styles.buttonContainer} ${expanded ? styles.expanded : ""}`} onClick={handleClick}>
		{
			expanded ? expandedContents() : dockedContents()
		}
	</button>
}
