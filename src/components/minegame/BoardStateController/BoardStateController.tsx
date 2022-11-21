import { useContext, useEffect, useState } from "react";

import BoardGenerationService from "@services/BoardGeneration.service";
import { NodeState } from "@interfaces/minegame/NodeState";
import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import styles from "./BoardStateController.module.css";
import { WinEvaluationParams } from "@interfaces/minegame/WinEvaluationParams";
import { ClickMode } from "@apptypes/ClickMode";
import { BoardRenderer } from "../BoardRenderer/BoardRenderer";
import { CanvasBoardRenderer } from "@components/minegame";

export interface BoardStateControllerProps {
	width: number;
	height: number;
	setupNodes: SetupNodeData[];
}

export function BoardStateController({ width, height, setupNodes }: BoardStateControllerProps) {

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
		if (state.gamestate != "ongame") return;
		const winEvalTimeout = setTimeout(() => {
			const closed = mineNodes.filter(n => !n.open);
			dispatch({
				type: 'evaluate-win', payload: {
					closed
				} as WinEvaluationParams
			})
		}, 200);
		return () => clearTimeout(winEvalTimeout)
	}, [mineNodes])

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

		if (state.gamestate == "won") {
			mineNodes.filter(n => n.mined).forEach(n => n.flagged = true);
			updateMineNodes();
		}
	}, [state.gamestate])

	useEffect(() => {
		setMineNodes(BoardGenerationService.buildInitialState(setupNodes, width, height))
		setStyleSection(computeStyle(width))
	}, [setupNodes])

	function updateMineNodes() {
		setMineNodes(prevMineNodes => [...prevMineNodes])
	}

	function computeStyle(width: number) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${width}, min-content)`,
			width: "min-content",
			height: "max-content",
			margin: "1rem",
		} as React.CSSProperties
	}

	function solveNode(uuid: string) {
		const nodeIdx = mineNodes.findIndex(node => node.uuid === uuid);
		if (nodeIdx === -1) return undefined;
		return mineNodes[nodeIdx];
	}

	function spreadNode(nodeState: NodeState) {
		if (!nodeState.open) return;
		const flaggedNeighbors = nodeState.neighbors?.filter(n => n.flagged) ?? [];
		if (flaggedNeighbors.length == 0 || flaggedNeighbors.length != nodeState.mineCount) return;
		nodeState.neighbors?.filter(n => !n.flagged || n.open).forEach(n => openNode(n));
		openNode(nodeState);
		updateMineNodes();
	}

	function updateFlagCount() {
		dispatch({ type: "update-flagcount", payload: mineNodes.filter(n => n.flagged).length })
	}

	function flagNode(nodeState: NodeState) {
		nodeState.flagged = !nodeState.flagged;
		updateFlagCount();
		updateMineNodes();
	}

	function openNode(nodeState: NodeState) {
		function openAll() {
			mineNodes.filter(n => !n.flagged).forEach(state => state.open = true)
			updateMineNodes();
		}
		function open(currentNodeState: NodeState) {
			if (currentNodeState.open || currentNodeState.mined || currentNodeState.flagged) return;
			currentNodeState.open = true;
			updateMineNodes();
			dispatch({ type: "add-score", payload: currentNodeState })
			if (currentNodeState.mineCount != 0) return;
			currentNodeState.neighbors?.filter(n => !n.flagged).forEach(nextState =>
				setTimeout(() => !nextState.open && open(nextState), 25)
			)
		}
		nodeState.mined ? openAll() : open(nodeState);
		nodeState.open = true;
		if (nodeState.mined) dispatch({ type: 'set-lost' });
	}

	function openByMode(node: NodeState, clickMode: ClickMode) {
		switch (clickMode) {
			case "normal":
				if (node.open) spreadNode(node);
				if (!node.flagged) openNode(node);
				break;
			case "spread":
				spreadNode(node);
				break;
			case "flag":
				if (!node.open) flagNode(node);
				break;
		}
	}

	function flagClick(uuid: string) {
		if (!actionable) return;
		const node = solveNode(uuid);
		if (!node) return;
		openByMode(node, "flag");
		updateMineNodes();
		if (state.gamestate != "ongame") dispatch({ type: "set-ongame" })
	}

	function onNodeClick(uuid: string) {
		if (!actionable) return;
		const node = solveNode(uuid);
		if (!node) return;
		const clickMode = state.clickMode;
		openByMode(node, clickMode)
		updateMineNodes()

		// If the gamestate is different to an idle gamestate and is not into a mine node
		const idleGamestates = ["idle", "preparing"]
		const { gamestate } = state;
		if (!node.mined && idleGamestates.findIndex(state => state == gamestate) !== -1) dispatch({ type: "set-ongame" })
	}

	return (
		<section onContextMenu={(e) => e.preventDefault()} className={styles.boardContainer}>
			<CanvasBoardRenderer nodes={mineNodes} nodeClick={onNodeClick} rightClick={flagClick} width={width} height={height} />
		</section>
	)
}
