import mouseLeft from "@assets/mouse-left.svg";
import mouseRight from "@assets/mouse-right.svg";
import { useEffect, useState } from "react";

import styles from "./Instructions.module.css";

export function Instructions() {

	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		function mouseover(e: MouseEvent) {
			const y = e.clientY;
			const relation = y / window.innerHeight;
			setHidden(relation > 0.6);
		}
		const event: keyof WindowEventMap = "mousemove";
		window.addEventListener(event, mouseover)
		return () => {
			window.removeEventListener(event, mouseover);
		}
	}, [])

	return <article className={`${styles.instructionsContainer} ${hidden ? "hidden" : ""}`}>
		<section>
			<img src={mouseLeft} />
			<p>click to open mines as normal.</p>
		</section>
		<section>
			<img src={mouseRight} />
			<p>click to flag discovered mines.</p>
		</section>
	</article>
}
