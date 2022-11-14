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
	const [actionable, setActionable] = useState(true);

	const [timerActive, setTimerActive] = useState(true);
	const [timerIntervalId, setTimerIntervalId] = useState(-1);


	const state = useContext(BoardStateContext);
	const dispatch = useContext(BoardDispatcherContext);

	useEffect(() => {
		return () => {
			clearInterval(timerIntervalId)
		}
	}, [])

	useEffect(() => {
		if (timerActive) {
			const intervalId = setInterval(() => {
				dispatch({ type: 'timer-counting' })
			}, 1000);
			setTimerIntervalId(intervalId);
		} else {
			clearInterval(timerIntervalId);
			setTimerIntervalId(-1);
		}
	}, [timerActive])

	useEffect(() => {
		const { gamestate } = state;
		setActionable(gamestate === "ongame" || gamestate === "idle")
		setTimerActive(gamestate === "ongame");
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

	function flagNode(nodeState: NodeState) {
		nodeState.flagged = !nodeState.flagged;
		setMineNodes(prevMineNodes => [...prevMineNodes]);
	}

	function openNode(nodeState: NodeState) {
		function openAll() {
			mineNodes.forEach(state => state.open = true)
			setMineNodes(prevMineNodes => {
				return [...prevMineNodes]
			})
		}
		function open(currentNodeState: NodeState) {
			if (currentNodeState.open || currentNodeState.mined || currentNodeState.flagged) return;
			currentNodeState.open = true;
			setMineNodes(prevMineNodes => {
				return [...prevMineNodes]
			})
			if (currentNodeState.mineCount != 0) return;
			currentNodeState.neighbors?.forEach(nextState =>
				setTimeout(() => !nextState.open && open(nextState), 25)
			)
		}
		nodeState.mined ? openAll() : open(nodeState);
		nodeState.open = true;
	}

	function onNodeClick(uuid: string) {
		if (!actionable) return;
		const nodeIdx = mineNodes.findIndex(node => node.uuid === uuid);
		if (nodeIdx === -1) return;
		const node = mineNodes[nodeIdx];
		const clickMode = state.clickMode;
		if (clickMode == "normal") {
			openNode(node);
		} else {
			flagNode(node);
		}
		setMineNodes([...mineNodes])
		if (state.gamestate != "ongame") dispatch({ type: "set-ongame" })
		if (node.open && node.mined) dispatch({ type: 'set-gameover' });
	}

	const renderBoard = () => {
		return (
			<section style={styleSection}>
				{mineNodes.map(({ uuid, mined, mineCount: surroundingMines, open, flagged }) => {
					return <MineNode key={uuid} uuid={uuid} isMined={mined} isFlagged={flagged} surroundingMines={surroundingMines} visible={open} nodeClick={onNodeClick} />
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
