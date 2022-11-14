import { ReactElement, useEffect, useState } from "react";
import styles from "./BigToggle.module.css";

export interface BigToggleProps {
	label: string;
	icon?: ReactElement;
	click?: () => void
	on?: boolean;
	styleState?: Partial<StyleState>;
}

export interface StyleState {
	label: ToggleStyleState, icon: ToggleStyleState, toggle: ToggleStyleState
}

export interface ToggleStyleState {
	on: string;
	off: string;
}

export function BigToggle({ label, icon, click = () => { }, on = false, styleState }: BigToggleProps) {

	const [visualStyles, setVisualStyles] = useState<StyleState>({
		label: { off: "text-black", on: "text-white" },
		icon: { off: "text-cyan-500", on: "text-white" },
		toggle: { off: "bg-white", on: "text-cyan-500" }
	})

	useEffect(() => {
		setVisualStyles(prevStyles => {
			return { ...prevStyles, ...styleState }
		});
	}, [styleState?.icon, styleState?.label, styleState?.toggle])

	const selectedStyles: { [Property in keyof StyleState]: string } = {
		icon: on ? visualStyles.icon.on : visualStyles.icon.off,
		label: on ? visualStyles.label.on : visualStyles.label.off,
		toggle: on ? visualStyles.toggle.on : visualStyles.toggle.off,
	}

	function handleClick() {
		click();
	}

	return <button className={`${styles.buttonContainer} ${on ? styles.on : ""} ${selectedStyles.toggle}`} onClick={handleClick}>
		<i className={selectedStyles.icon}>{!!icon && icon}</i>
		<span className={selectedStyles.label}>{label}</span>
	</button>
}
