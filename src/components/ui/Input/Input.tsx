import { useState } from "react";

import styles from "./Input.module.css";

export interface InputProps {
	label?: string;
	placeholder?: string;
	initialValue?: string;
	type?: string;
	onValue?: (value: string) => void;
}

export function Input({ label = "", placeholder = "", initialValue = "", type = "text", onValue = (_value: string) => { } }: InputProps) {

	const [value, setValue] = useState(initialValue);

	function emitValue() {
		onValue(value);
	}

	return <article className={styles.inputContainer}>
		<label>{label}</label>
		<input type={type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} onBlur={emitValue} />
	</article>
}
