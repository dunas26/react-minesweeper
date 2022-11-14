import { useContext, useEffect, useState } from "react";

import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";
import { NodeData, SetupNodeData } from "@interfaces/minegame/NodeTypes";
import BoardGenerationService from "@services/BoardGeneration.service";
import BoardMineDataSolver from "@services/BoardMineDataSolver.service";
import { Board } from "@components/minegame";

import styles from "./BoardBuilder.module.css";

export function BoardBuilder() {

	const boardState = useContext(BoardStateContext)
	const boardDispatch = useContext(BoardDispatcherContext)

	const [setupNodes, setSetupNodes] = useState<SetupNodeData[]>([]);
	const [params, setParams] = useState<BoardBuildParams>({
		width: 5,
		height: 5,
		minePercent: 0.1
	});

	function generateBoard() {
		const { width, height, minePercent } = params;
		const originNodes: NodeData[] = BoardGenerationService.generate(width, height, minePercent);
		return BoardMineDataSolver.solve(originNodes, width, height);
	}

	useEffect(() => {
		const board = generateBoard();
		setSetupNodes(board);
	}, [params])

	useEffect(() => {
		const { gamestate } = boardState;
		if (gamestate == "preparing") {
			setSetupNodes(generateBoard());
			boardDispatch({ type: 'gamestart' })
		}
	}, [boardState])

	return (
		<section className={styles.viewport}>
			<Board setupNodes={setupNodes} height={params.height} width={params.width} />
		</section>
	)
}
