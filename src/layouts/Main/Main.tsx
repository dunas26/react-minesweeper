import { ReactElement } from "react";
import { Footer, Header, Sidebar } from "@layouts";

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
		<Sidebar />
		<Footer />
	</section>
}
