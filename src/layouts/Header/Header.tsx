import { AiOutlineFlag } from "react-icons/ai";

import { Button, Title } from "@components/ui";
import styles from "./Header.module.css";

export function Header() {
	return <header className={styles.headerContainer}>
		<section>
			<Title icon={<AiOutlineFlag className="w-12 h-auto" />} title="Minesweeper" subtitle="Let's play" />
		</section>
		<section>
			<Button label="See my statistics" />
		</section>
	</header>
}
