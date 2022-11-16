import { useState } from "react";
import { AiOutlineTrophy } from "react-icons/ai";

import { Title } from "@components/ui";

import styles from "./Ranking.module.css";
import { RankingBadge, RankingBadgeProps } from "@components/ui/RankingBadge/RankingBadge";

export function Ranking() {

	const [ranking, setRanking] = useState<Omit<RankingBadgeProps, 'position'>[]>([
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
		{ label: "Yada", difficulty: "veryeasy", score: 2275 },
	]);

	return <section className={styles.rankingContainer}>
		<Title title="Ranking" icon={<AiOutlineTrophy className="w-16 h-auto text-amber-500" />} size="lg" />
		<main className={styles.mainContainer}>
			{ranking.map(({ label, difficulty, score }, index) => {
				return <RankingBadge position={index + 1} label={label} difficulty={difficulty} score={score} />
			})}
		</main>
	</section>
}
