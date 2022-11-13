import { useEffect, useState } from "react";
import { AiOutlineFlag, AiOutlineLineChart } from "react-icons/ai";

import { Button, Title } from "@components/ui";
import styles from "./Header.module.css";

export function Header() {

	const [waiting, setWaiting] = useState(false);

	function temporaryWaiting() {
		setWaiting(true);
		setTimeout(() => setWaiting(false), 1000);
	}

	useEffect(() => {
		temporaryWaiting()
	}, [])

	return <header className={styles.headerContainer}>
		<section onClick={temporaryWaiting}>
			<Title icon={<AiOutlineFlag className="w-12 h-auto text-amber-600" />} title="Minesweeper" subtitle="Let's play" />
		</section>
		<section>
			<Button label="See my statistics" icon={<AiOutlineLineChart className="w-6 h-auto text-amber-600" />} waiting={waiting} />
		</section>
	</header>
}
