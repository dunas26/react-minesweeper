import { useContext, useEffect, useState } from "react";

import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";
import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import BoardGenerationService from "@services/BoardGeneration.service";
import BoardMineDataSolver from "@services/BoardMineDataSolver.service";
import { BoardStateController } from "@components/minegame";

import styles from "./BoardBuilder.module.css";
import { BoardState } from "@interfaces/minegame/BoardState";
import { RecursivePartial } from "@utils/types";

export function BoardBuilder() {

	const boardState = useContext(BoardStateContext)
	const boardDispatch = useContext(BoardDispatcherContext)

	const [setupNodes, setSetupNodes] = useState<SetupNodeData[]>([]);
	const [params, setParams] = useState<BoardBuildParams>({
		width: 5,
		height: 5,
		minePercent: 0.1
	});

	useEffect(() => {
		const board = generateBoard();
		setSetupNodes(board);
		boardDispatch({ type: 'set-idle' })
	}, [params])

	useEffect(() => {
		const { buildParameters } = boardState;
		if (!buildParameters) return;
		if (!parametersHaveChanged(buildParameters)) return;
		setParams({ ...buildParameters });
	}, [boardState.buildParameters])

	useEffect(() => {
		const { gamestate, buildParameters } = boardState;
		switch (gamestate) {
			case "preparing":
				// If the state is preparing -> perform a board reset
				setParams({ ...buildParameters })
				break;
			default:
				break;
		}

	}, [boardState.gamestate])

	function parametersHaveChanged(board: BoardBuildParams) {
		return board.width != params.width
			|| board.height != params.height
			|| board.minePercent != params.minePercent;
	}

	function generateBoard() {
		const { width, height, minePercent } = params;
		const { grid, mineCount, seed } = BoardGenerationService.generate(width, height, minePercent);
		boardDispatch<RecursivePartial<BoardState>>(
			{
				type: 'build-state',
				payload: {
					board: { mineCount, seed, }
				}
			},
		)

		return BoardMineDataSolver.solve(grid, width, height);
	}

	return (
		<section className={styles.viewport}>
			<BoardStateController setupNodes={setupNodes} height={params.height} width={params.width} />
		</section>
	)
}
