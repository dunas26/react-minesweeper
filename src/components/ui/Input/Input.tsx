import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

import styles from "./Input.module.css";

export interface InputProps {
	label?: string;
	placeholder?: string;
	value?: string;
	type?: string;
	onValue?: (value: string) => void;
}

export function Input({ label = "", value = "", placeholder = "", type = "text", onValue = (_value: string) => { } }: InputProps) {

	useEffect(() => {
		setInternalValue(value);
	}, [value])

	const [internalValue, setInternalValue] = useState(value);

	function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
		const { value } = e.target
		setInternalValue(value)
		onValue(value);
	}

	return <article className={styles.inputContainer}>
		<label>{label}</label>
		<input type={type} placeholder={placeholder} value={internalValue} onChange={handleValueChange} />
	</article>
}
