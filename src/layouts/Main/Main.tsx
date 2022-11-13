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
	return <section className={styles.mainContainer}>
		<Header />
		<main className={styles.mainSection}>
			{!!children && children}
		</main>
		<Sidebar>
			<SidebarButton label="Play the game" icon={<RiGamepadLine className="w-8 h-auto" />} />
			<SidebarButton label="Daily challenge" icon={<AiOutlineCalendar className="w-8 h-auto" />} />
			<SidebarButton label="Ranking" icon={<AiOutlineTrophy className="w-8 h-auto" />} />
		</Sidebar>
		<Footer />
	</section>
}
