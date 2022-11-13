import { Header } from "@layouts";
import { ReactElement } from "react";

export interface MainLayoutProps {
	children?: ReactElement
}

export function Main({ children = undefined }: MainLayoutProps) {
	return <section>
		<Header />
		<main>
			{!!children && children}
		</main>
	</section>
}
