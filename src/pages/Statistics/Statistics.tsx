import { useState } from "react";

import { KPICard, Title } from "@components/ui";
import { CardGroup } from "@layouts";
import MessageService from "@services/Message.service";

import styles from "./Statistics.module.css";
import { AiOutlineLineChart } from "react-icons/ai";

export function Statistics() {

	const [loaded, setLoaded] = useState(true);
	const [overall, setOverall] = useState(0);
	const [average, setAverage] = useState(0);
	const [lastBoard, lastBoardTimestamp] = useState(0);

	const [won, setWon] = useState(0);
	const [lost, setLost] = useState(0);
	const [played, setPlayed] = useState(0);

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
			<section className={styles.difficultySection}>
				<KPICard colorClass="text-lime-500" label={solveCaptions("kpi_won")} value={won} />
				<KPICard colorClass="text-red-600" label={solveCaptions("kpi_lost")} value={lost} />
				<KPICard colorClass="text-amber-500" label={solveCaptions("kpi_played")} value={played} layoutClass={styles.kpiPlayed} />
				<KPICard colorClass="text-sky-600" label={solveCaptions("kpi_avghours")} value={average} layoutClass={styles.kpiAvgHours} />
			</section>
		</CardGroup>
	</section>
}
