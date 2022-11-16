import { useState } from "react";

import { BigToggle, KPICard, Title } from "@components/ui";
import { CardGroup } from "@layouts";
import MessageService from "@services/Message.service";

import styles from "./Statistics.module.css";
import { AiOutlineLineChart } from "react-icons/ai";
import { DifficultyStars } from "@components/minegame";

export function Statistics() {

	const difficultyStates = [
		"veryeasy",
		"easy",
		"medium",
		"hard",
		"extremelyhard",
		"impossible",
	]

	const [selectedDifficulty, setSelectedDifficulty] = useState(difficultyStates[0]);

	const [loaded, setLoaded] = useState(true);
	const [overall, setOverall] = useState(0);
	const [average, setAverage] = useState(0);
	const [lastBoard, lastBoardTimestamp] = useState(0);

	const [won, setWon] = useState(0);
	const [lost, setLost] = useState(0);
	const [played, setPlayed] = useState(0);

	function handleToggle(index: number) {
		setSelectedDifficulty(difficultyStates[index])
	}

	function isSelectedDifficulty(state: string) {
		return selectedDifficulty == state;
	}

	function solveCaptions(caption: string) {
		return MessageService.getMessage(caption);
	}

	return <section className={styles.pageContainer}>
		<Title size="lg" title={solveCaptions("title_statistics")} icon={<AiOutlineLineChart className="w-16 h-auto text-amber-500" />} />
		<CardGroup title={solveCaptions("title_timeinfo")}>
			<section className={styles.timeSection}>
				<KPICard colorClass="text-cyan-500" label={solveCaptions("kpi_hours")} value={overall} />
				<KPICard colorClass="text-purple-600" label={solveCaptions("kpi_lastboard")} value={lastBoard} />
			</section>
		</CardGroup>
		<CardGroup title={solveCaptions("title_difficultyinfo")}>
			<section className={styles.difficultySelector}>
				{difficultyStates.map((state, index) => {
					const styles = { toggle: { on: "bg-purple-500", off: "bg-white" }, label: { on: "text-white font-bold", off: "text-black" } }
					return <BigToggle key={state} on={isSelectedDifficulty(state)} label={solveCaptions(`difficulty_${state}`)} icon={<DifficultyStars stars={index + 1} />} click={() => handleToggle(index)} styleState={styles} />
				})}
			</section>
			<section className={styles.difficultySection}>
				<KPICard colorClass="text-lime-500" label={solveCaptions("kpi_won")} value={won} />
				<KPICard colorClass="text-red-600" label={solveCaptions("kpi_lost")} value={lost} />
				<KPICard colorClass="text-amber-500" label={solveCaptions("kpi_played")} value={played} layoutClass={styles.kpiPlayed} />
				<KPICard colorClass="text-sky-600" label={solveCaptions("kpi_avghours")} value={average} layoutClass={styles.kpiAvgHours} />
			</section>
		</CardGroup>
	</section>
}
