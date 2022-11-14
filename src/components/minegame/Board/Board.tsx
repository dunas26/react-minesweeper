import { useContext, useEffect, useState } from "react";

import BoardGenerationService from "@services/BoardGeneration.service";
import { NodeState } from "@interfaces/minegame/NodeState";
import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import { MineNode } from "@components/minegame";
import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import styles from "./Board.module.css";

export interface BoardProps {
	width: number;
	height: number;
	setupNodes: SetupNodeData[];
}

export function Board({ width, height, setupNodes }: BoardProps) {

	const [styleSection, setStyleSection] = useState(computeStyle(width))
	const [mineNodes, setMineNodes] = useState<NodeState[]>([]);
	const [actionable, setActionable] = useState<boolean>(true);

	const state = useContext(BoardStateContext);
	const dispatch = useContext(BoardDispatcherContext);

	useEffect(() => {
		const { gamestate } = state;
		setActionable(gamestate === "ongame" || gamestate === "idle")
	}, [state.gamestate])

	useEffect(() => {
		setMineNodes(BoardGenerationService.buildInitialState(setupNodes, width, height))
		setStyleSection(computeStyle(width))
	}, [setupNodes])

	function computeStyle(width: number) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${width}, min-content)`,
			width: "min-content",
			height: "max-content",
			margin: "1rem",
		} as React.CSSProperties
	}

	function openNode(state: NodeState) {
		function openAll() {
			mineNodes.forEach(state => state.open = true)
			setMineNodes(prevMineNodes => {
				return [...prevMineNodes]
			})
		}
		function open(state: NodeState) {
			if (state.open || state.mined || state.flagged) return;
			state.open = true;
			setMineNodes(prevMineNodes => {
				return [...prevMineNodes]
			})
			if (state.mineCount != 0) return;
			state.neighbors?.forEach(nextState =>
				setTimeout(() => !nextState.open && open(nextState), 25)
			)
		}
		state.mined ? openAll() : open(state);
		state.open = true;
	}

	function onNodeClick(uuid: string) {
		if (!actionable) return;
		const nodeIdx = mineNodes.findIndex(node => node.uuid === uuid);
		if (nodeIdx === -1) return;
		const node = mineNodes[nodeIdx];
		openNode(node);
		if (node.mined) {
			dispatch({ type: 'gameover' });
		}
		setMineNodes([...mineNodes])
	}

	const renderBoard = () => {
		return (
			<section style={styleSection}>
				{mineNodes.map(({ uuid, mined, mineCount: surroundingMines, open }) => {
					return <MineNode key={uuid} uuid={uuid} isMined={mined} surroundingMines={surroundingMines} visible={open} nodeClick={onNodeClick} />
				})}
			</section>
		)
	}

	return (
		<section className={styles.boardContainer}>
			{renderBoard()}
		</section>
	)
}
