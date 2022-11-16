import MessageService from "@services/Message.service";
import { BiMedal } from "react-icons/bi";
import styles from "./RankingBadge.module.css";

export interface RankingBadgeProps {
	position: number;
	score: number;
	label: string;
	difficulty: string;
}

export function RankingBadge({ position, label, difficulty, score }: RankingBadgeProps) {

	function showTrophy() {
		return position > 0 && position <= 3;
	}

	function getTrophyType(position: number) {

		const color: { [key: number]: string } = {
			1: "text-amber-300",
			2: "text-slate-400",
			3: "text-orange-600"
		}

		const finalColor = (position in color) ? color[position] : "text-gray-800";

		return <i>{showTrophy() && <BiMedal className={`${finalColor} w-8 h-auto`} />}</i>
	}

	return <article className={styles.rankingContainer}>
		{getTrophyType(position)}
		<p className={`${styles.positionLabel}`}>{position}</p>
		<p className={styles.label}>{label}</p>
		<p className={styles.difficultyLabel}>{MessageService.getMessage(`difficulty_${difficulty}`)}</p>
		<p className={styles.scoreLabel}>{score}</p>
	</article>
}
