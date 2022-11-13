import { ReactElement } from "react";
import { RiGamepadLine } from "react-icons/ri";
import { AiOutlineCalendar, AiOutlineTrophy } from "react-icons/ai";

import { Footer, Header, Sidebar } from "@layouts";
import { SidebarButton } from "@components/ui";

import styles from "./Main.module.css";

export interface MainLayoutProps {
	children?: ReactElement
}

export function Main({ children = undefined }: MainLayoutProps) {

	function sidebarButtons(expanded: boolean) {
		return <>
			<SidebarButton label="Play the game" expanded={expanded} icon={<RiGamepadLine className="w-8 h-auto" />} />
			<SidebarButton label="Daily challenge" expanded={expanded} icon={<AiOutlineCalendar className="w-8 h-auto" />} />
			<SidebarButton label="Ranking" expanded={expanded} icon={<AiOutlineTrophy className="w-8 h-auto" />} />
		</>
	}

	return <section className={styles.mainContainer}>
		<Header />
		<main className={styles.mainSection}>
			{!!children && children}
		</main>
		<Sidebar children={(expanded: boolean) => sidebarButtons(expanded)} />
		<Footer />
	</section>
}
