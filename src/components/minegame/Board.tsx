import { useContext, useEffect, useState } from "react";

import BoardGenerationService from "@services/BoardGenerationService";
import { NodeState } from "@interfaces/minegame/NodeState";
import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import { MineNode } from "@components/minegame/MineNode";
import styles from "./Board.module.css";
import { BoardDispatcherContext, BoardStateContext } from "@contexts/BoardProvider";
import { Button } from "@components/ui/Button/Button";

export interface BoardProps {
	width: number;
	height: number;
	setupNodes: SetupNodeData[];
}

export function Board({ width, height, setupNodes }: BoardProps) {

	const [styleSection, setStyleSection] = useState(computeStyle(width))
	const [mineNodes, setMineNodes] = useState<NodeState[]>([]);
	const [actionable, setActionable] = useState<boolean>(true);

	const dispatch = useContext(BoardDispatcherContext);
	const state = useContext(BoardStateContext);

	useEffect(() => {
		setMineNodes(BoardGenerationService.buildInitialState(setupNodes, width, height))
		setStyleSection(computeStyle(width))
	}, [setupNodes])

	useEffect(() => {
		const { gamestate } = state;
		if (gamestate == "ongame") {
			setActionable(true);
		}
	}, [state])

	function computeStyle(width: number) {
		return {
			display: "grid",
			gridTemplateColumns: `repeat(${width}, min-content)`,
			width: "min-content",
			margin: "1rem"
		}
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
			setActionable(false);
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
			{state.gamestate == "gameover" &&
				<div className={styles.overlay} >
					<p className={styles.messageHeading}>You lose</p>
					<Button label="Restart" click={() => dispatch({ type: 'setup' })} />
				</div>
			}
		</section>
	)
}
