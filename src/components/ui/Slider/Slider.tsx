import { ChangeEvent, useEffect, useState } from "react";
import styles from "./Slider.module.css";

export interface SliderProps {
	label?: string;
	value?: number;
	min?: number;
	max?: number;
	onValue?: (value: number) => void;
}

export function Slider({ label = "", value = 0, min = 0, max = 100, onValue = (_value: number) => { } }) {

	useEffect(() => {
		setInternalValue(value);
	}, [value]);

	const [timeoutId, setTimeoutId] = useState(-1);
	const [internalValue, setInternalValue] = useState(value);

	function handleValueChange(e: ChangeEvent<HTMLInputElement>) {
		const targetValue = e.target.value;
		const numberValue = parseInt(targetValue)
		setInternalValue(numberValue)
		clearTimeout(timeoutId);
		const newTimeoutId = setTimeout(() => {
			setTimeoutId(-1);
			setInternalValue(numberValue);
			onValue(numberValue);
		}, 250);
		setTimeoutId(newTimeoutId);
	}

	return <article className={styles.inputContainer}>
		<label>{label}</label>
		<section className={styles.sliderContainer}>
			<p>{min}</p>
			<input className={styles.slider} type="range" min={min} max={max} value={internalValue} onChange={handleValueChange} />
			<p>{max}</p>
		</section>
	</article>
}
