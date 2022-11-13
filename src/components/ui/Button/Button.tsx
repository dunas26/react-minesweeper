import { ReactElement } from 'react';
import { CgSpinner } from 'react-icons/cg';

import styles from './Button.module.css';

export interface ButtonProps {
	label?: string;
	click?: () => void;
	icon?: ReactElement;
	iconPlacement?: "left" | "right";
	waiting?: boolean;
}

export function Button({ label = "", click = () => { }, icon = undefined, iconPlacement = "left", waiting = false }: ButtonProps) {

	function handleClick() {
		if (waiting) return;
		click();
	}

	function buttonContents() {
		return <>
			{!!icon && iconPlacement == "left" && icon}
			{label}
			{!!icon && iconPlacement == "right" && icon}
		</>
	}

	function waitContents() {
		return <div className={styles.waitFrame}>
			<p className={styles.waitLabel}>{label}</p>
			<CgSpinner className={styles.spinner} />
		</div>
	}

	return <button className={styles.buttonFrame} onClick={handleClick}>
		{
			waiting
				? waitContents()
				: buttonContents()
		}
	</button>
}
