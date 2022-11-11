import { NodeState } from "@interfaces/minegame/NodeState";
import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import BoardGenerationService from "@services/BoardGenerationService";
import { useEffect, useState } from "react";
import { MineNode } from "./MineNode";

export interface BoardProps {
	width: number;
	height: number;
	setupNodes: SetupNodeData[];
}

export function Board({ width, height, setupNodes }: BoardProps) {

	const [isValid, setIsValid] = useState(checkValidity(setupNodes, width, height));
	const [styleSection, setStyleSection] = useState(computeStyle(width))
	const [mineNodes, setMineNodes] = useState<NodeState[]>([]);

	useEffect(() => {
		setMineNodes(BoardGenerationService.buildInitialState(setupNodes, width, height))
	}, [])

	useEffect(() => {
		setIsValid(checkValidity(setupNodes, width, height));
		setStyleSection(computeStyle(width))
	}, [setupNodes, width, height])

	function checkValidity(setupNodes: SetupNodeData[], width: number, height: number) {
		return setupNodes.length == (width * height)
	}

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
		const nodeIdx = mineNodes.findIndex(node => node.uuid === uuid);
		if (nodeIdx === -1) return;
		const node = mineNodes[nodeIdx];
		openNode(node);
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
		<section>
			{isValid && renderBoard()}
		</section>
	)
}
