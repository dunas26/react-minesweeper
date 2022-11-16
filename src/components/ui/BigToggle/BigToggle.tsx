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

export function BigToggle({ label, icon, click = () => { }, on = false, styleState = {} }: BigToggleProps) {

	const [visualStyles, setVisualStyles] = useState<StyleState>({
		label: { off: "text-black", on: "text-white" },
		icon: { off: "text-cyan-500", on: "text-white" },
		toggle: { off: "bg-white", on: "bg-cyan-500" }
	})

	useEffect(() => {
		setVisualStyles(prevStyles => {
			return {
				icon: { ...prevStyles.icon, ...styleState.icon },
				label: { ...prevStyles.label, ...styleState.label },
				toggle: { ...prevStyles.toggle, ...styleState.toggle }
			}
		});
	}, [styleState?.icon, styleState?.label, styleState?.toggle])

	function computeSelectedStyles(): { [Property in keyof StyleState]: string } {
		return {
			icon: on ? visualStyles.icon.on : visualStyles.icon.off,
			label: on ? visualStyles.label.on : visualStyles.label.off,
			toggle: on ? visualStyles.toggle.on : visualStyles.toggle.off,
		}
	}

	function handleClick() {
		click();
	}

	return <button className={`${styles.buttonContainer} ${on ? styles.on : ""} ${computeSelectedStyles().toggle}`} onClick={handleClick}>
		<i className={computeSelectedStyles().icon}>{!!icon && icon}</i>
		<span className={computeSelectedStyles().label}>{label}</span>
	</button>
}
