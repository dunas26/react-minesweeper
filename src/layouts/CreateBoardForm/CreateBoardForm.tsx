import { useContext, useEffect, useState } from "react";
import { AiOutlineAppstoreAdd, AiOutlineWarning } from "react-icons/ai";

import { Button, DifficultyProber, Input, KPICard, Slider } from "@components/ui";
import { ModalDispatchContext } from "@contexts/ModalProvider";
import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";
import SeedingService from "@services/Seeding.service";

import styles from "./CreateBoardForm.module.css";
import MessageService from "@services/Message.service";
import BoardParamCacheService from "@services/BoardParamCache.service";

export function CreateBoardForm() {

	const dispatcher = useContext(ModalDispatchContext);

	const [seed, setSeed] = useState(SeedingService.getCurrentState().seed || SeedingService.generateRandom(12))
	const [width, setWidth] = useState(5)
	const [height, setHeight] = useState(5)
	const [percent, setPercent] = useState(0.1)
	const [mineValue, setMineValue] = useState(0);

	useEffect(() => {
		const params = BoardParamCacheService.getParams();
		if (!params) return;
		setCacheFormValues(params);
	}, [])

	useEffect(() => {
		setMineValue(Math.floor(percent * width * height))
	}, [percent])

	useEffect(() => {
		seed ? SeedingService.changeCurrentSeed(seed) : SeedingService.changeCurrentSeed();
		dispatcher({ type: "set-payload", payload: { width, height, minePercent: percent } as BoardBuildParams })
	}, [seed, height, width, percent])

	function setCacheFormValues({ width, height, minePercent }: BoardBuildParams) {
		setWidth(width);
		setHeight(height);
		setPercent(minePercent);
	}

	function handleHeightChange(value: string) {
		setHeight(toInt(value))
	}

	function handleWidthChange(value: string) {
		setWidth(toInt(value))
	}

	function handlePercentChange(value: number) {
		const fraction = value / 100;
		setPercent(fraction);
		setMineValue(Math.floor(fraction * width * height))
	}

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
			<Input label="Width" type="number" value={width.toString()} onValue={handleWidthChange} />
			<Input label="Height" type="number" value={height.toString()} onValue={handleHeightChange} />
		</section>
		<section>
			<Slider label="Mine percent" min={5} max={95} value={percent * 100} onValue={handlePercentChange} />
			<section className={styles.mineFormula}>
				<DifficultyProber percent={percent} />
				<KPICard label="Mine count" value={mineValue} />
			</section>
		</section>
		<p className={styles.warningMsg}><i>
			<AiOutlineWarning className="w-8 h-auto" />
		</i>{MessageService.getMessage("warning_override")}</p>
	</section>
}
