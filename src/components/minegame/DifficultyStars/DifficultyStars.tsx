import { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import styles from "./DifficultyStars.module.css";

export interface DifficultyStarsProps {
	stars: number;
}

type StarLayout = { [key: string]: number[] }
export function DifficultyStars({ stars }: DifficultyStarsProps) {
	const [starLayout, setStarLayout] = useState<StarLayout>({});

	useEffect(() => {
		const first = Math.max(0, Math.min(stars - 0, 3));
		const second = Math.max(0, Math.min(stars - 3, 2));
		const third = Math.max(0, Math.min(stars - 5, 1));
		setStarLayout({
			first: new Array(first).fill(0),
			second: new Array(second).fill(0),
			third: new Array(third).fill(0)
		} as StarLayout);
	}, [stars])

	function getLayout(level: string): number[] {
		return level in starLayout
			? starLayout[level]
			: []
	}

	function renderStar() {
		return <AiFillStar className="-m-[2px]" />
	}

	function isNon4Stars() {
		return stars != 4;
	}

	function renderNon4Stars() {
		return <>
			<section>
				{getLayout("third").map(() => {
					return renderStar();
				})}
			</section>
			<section>
				{getLayout("second").map(() => {
					return renderStar();
				})}
			</section>
			<section>
				{getLayout("first").map(() => {
					return renderStar();
				})}
			</section>
		</>
	}

	function render4Stars() {
		const tuple = [0, 0]
		return <>
			{tuple.map(() => {
				return <section>
					{tuple.map(() => {
						return renderStar();
					})}
				</section>
			})}
		</>
	}

	return <article className={styles.starsContainer}>
		{isNon4Stars() ? renderNon4Stars() : render4Stars()}
	</article>
}
