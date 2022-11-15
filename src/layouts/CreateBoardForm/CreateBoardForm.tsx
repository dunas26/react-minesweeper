import { Button } from "@components/ui";
import { Input } from "@components/ui/Input/Input";
import { Slider } from "@components/ui/Slider/Slider";
import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import { ModalDispatchContext, ModalStateContext } from "@contexts/ModalProvider";
import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";
import SeedingService from "@services/Seeding.service";
import { useContext, useEffect, useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineWarning } from "react-icons/ai";

import styles from "./CreateBoardForm.module.css";

export function CreateBoardForm() {

	const dispatcher = useContext(ModalDispatchContext);

	const [seed, setSeed] = useState(SeedingService.generateRandom(12))
	const [width, setWidth] = useState(5)
	const [height, setHeight] = useState(5)
	const [percent, setPercent] = useState(10)

	const [timeoutId, setTimeoutId] = useState(-1);

	useEffect(() => {
		seed ? SeedingService.changeCurrentSeed(seed) : SeedingService.changeCurrentSeed();
		dispatcher({ type: "set-payload", payload: { width, height, minePercent: percent / 100 } as BoardBuildParams })
	}, [])

	useEffect(() => {
		const newTimeoutId = setTimeout(() => {
			seed ? SeedingService.changeCurrentSeed(seed) : SeedingService.changeCurrentSeed();
			dispatcher({ type: "set-payload", payload: { width, height, minePercent: percent / 100 } as BoardBuildParams })
			setTimeoutId(-1);
		}, 250);
		setTimeoutId(newTimeoutId);
		return () => {
			clearTimeout(timeoutId)
		}
	}, [seed, height, width, percent])

	function generateNewSeed() {
		const newSeed = SeedingService.generateRandom(12);
		setSeed(newSeed);
	}

	function toInt(value: string) {
		return parseInt(value);
	}

	return <section className={styles.formContainer}>
		<section className={styles.seedSettings}>
			<Input label="Seed" type="text" value={seed} onValue={setSeed} />
			<Button label="generate" click={generateNewSeed} icon={<AiOutlineAppstoreAdd className="w-6 h-auto text-amber-400" />} />
		</section>
		<section className={styles.boardSettings}>
			<Input label="Width" type="number" value={width.toString()} onValue={value => setWidth(toInt(value))} />
			<Input label="Height" type="number" value={height.toString()} onValue={value => setHeight(toInt(value))} />
		</section>
		<section>
			<Slider label="Mine percent" value={percent} onValue={value => setPercent(value)} />
			<section className={styles.mineFormula}>
				<p>{percent}</p>
			</section>
		</section>
		<p className={styles.warningMsg}><i>
			<AiOutlineWarning className="w-4 h-auto" />
		</i>You haven't completed the board yet</p>
	</section>
}
