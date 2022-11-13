import { AiOutlineFlag, AiOutlineLineChart } from "react-icons/ai";
import { Link } from "react-router-dom";

import { Button, Title } from "@components/ui";
import styles from "./Header.module.css";

export function Header() {

	return <header className={styles.headerContainer}>
		<Link to="/">
			<section>
				<Title icon={<AiOutlineFlag className="w-12 h-auto text-amber-600" />} title="Minesweeper" subtitle="Let's play" />
			</section>
		</Link>
		<section>
			<Link to="/statistics">
				<Button label="See my statistics" icon={<AiOutlineLineChart className="w-6 h-auto text-amber-600" />} />
			</Link>
		</section>
	</header>
}
