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
	const [valueEmitTimeout, setValueEmitTimeout] = useState(-1);

	function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
		setInternalValue(e.target.value)
		clearTimeout(valueEmitTimeout);
		const timeoutId = setTimeout(() => {
			onValue(internalValue)
			setValueEmitTimeout(-1);
		}, 250);
		setValueEmitTimeout(timeoutId);
		onValue(value);
	}

	return <article className={styles.inputContainer}>
		<label>{label}</label>
		<input type={type} placeholder={placeholder} value={internalValue} onChange={handleValueChange} />
	</article>
}
