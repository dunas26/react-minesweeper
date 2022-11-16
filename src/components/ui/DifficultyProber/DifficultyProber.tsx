import MessageService from "@services/Message.service";
import { useEffect, useState } from "react";

import styles from "./DifficultyProber.module.css";

export interface DifficultyProberProps {
	percent: number;
}

const difficultyStates = ["veryeasy", "easy", "medium", "hard", "extremelyhard", "impossible"];
const colors = ["text-lime-500", "text-lime-500 ", "text-amber-500", "text-red-600", "text-red-600", "text-purple-500"];

export function DifficultyProber({ percent }: DifficultyProberProps) {

	const [color, setColor] = useState("");
	const [label, setLabel] = useState("");

	useEffect(() => {
		const index = calculateDifficultyIndex(percent);
		setColor(colors[index]);
		const rawState = difficultyStates[index];
		setLabel(MessageService.getMessage(`difficulty_${rawState}`))
	}, [percent])

	function calculateDifficultyIndex(percent: number) {
		const bias = 1;
		const statesCount = difficultyStates.length;
		const selectedIndex = Math.min(Math.floor(percent * (statesCount + bias)), statesCount - 1);
		return selectedIndex;
	}

	return <article className={styles.container}>
		<p className={color}>{label}</p>
	</article>
}
