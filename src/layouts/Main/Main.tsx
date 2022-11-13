import { ReactElement } from "react";
import { RiGamepadLine } from "react-icons/ri";
import { AiOutlineCalendar, AiOutlineTrophy } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import { Footer, Header, Sidebar } from "@layouts";
import { SidebarButton } from "@components/ui";

import styles from "./Main.module.css";

export interface MainLayoutProps {
	children?: ReactElement
}

export function Main({ children = undefined }: MainLayoutProps) {

	const navigate = useNavigate();

	function sidebarButtons(expanded: boolean) {
		return <>
			<SidebarButton label="Play the game" click={() => navigate("/")} expanded={expanded} icon={<RiGamepadLine className="w-8 h-auto" />} />
			<SidebarButton label="Daily challenge" click={() => navigate("/daily")} expanded={expanded} icon={<AiOutlineCalendar className="w-8 h-auto" />} />
			<SidebarButton label="Ranking" click={() => navigate("/ranking")} expanded={expanded} icon={<AiOutlineTrophy className="w-8 h-auto" />} />
		</>
	}

	return <section className={styles.mainContainer}>
		<Header />
		<main className={styles.mainSection}>
			<Sidebar children={(expanded: boolean) => sidebarButtons(expanded)} />
			{!!children && children}
		</main>
		<Footer />
	</section>
}
