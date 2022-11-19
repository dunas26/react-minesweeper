import { useEffect, useState } from "react";
import { AiOutlineCalendar, AiOutlineEdit } from "react-icons/ai";

import { Button, Title } from "@components/ui";
import MessageService from "@services/Message.service";

import styles from "./Daily.module.css";

export function Daily() {

	const [enabled, setEnabled] = useState(true);

	function enabledContents() {
		return <section className={styles.content}>
			<p>{MessageService.getMessage("text_startdaily")}</p>
			<Button label={MessageService.getMessage("button_startdaily")} icon={<AiOutlineEdit className="w-8 h-auto text-amber-500" />} />
		</section>
	}

	function disabledContents() {
		return <section className={styles.content}>
			<p>{MessageService.getMessage("text_nodaily")}</p>
		</section>
	}

	return <section className={styles.dailyContainer}>
		<Title title="Daily challenge" icon={<AiOutlineCalendar className="w-16 h-auto text-amber-500" />} size="lg" />
		<main className={styles.mainContainer}>
			{enabled ? enabledContents() : disabledContents()}
		</main>
	</section>
}
