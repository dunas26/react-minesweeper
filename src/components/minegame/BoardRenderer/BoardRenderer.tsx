import { NodeState } from "@interfaces/minegame/NodeState";
import { MineNode } from "../MineNode/MineNode";

export interface BoardRendererProps {
	nodes: NodeState[],
	nodeClick: (uuid: string) => void,
	rightClick: (uuid: string) => void,
}

export function BoardRenderer({ nodes, nodeClick, rightClick }: BoardRendererProps) {
	return <>
		{nodes.map(({ uuid, mined, mineCount: surroundingMines, open, flagged }) => {
			return <MineNode key={uuid} uuid={uuid} isMined={mined} isFlagged={flagged} surroundingMines={surroundingMines} visible={open} nodeClick={nodeClick} rightClick={rightClick} />
		})}
	</>;
}
