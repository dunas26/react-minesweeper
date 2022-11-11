import { SetupNodeData } from "@interfaces/minegame/NodeTypes";
import { MineNode } from "./MineNode";

export interface BoardProps {
	width: number;
	height: number;
	setupNodes: SetupNodeData[];
}

export function Board({ width, height, setupNodes }: BoardProps) {

	const isValid = setupNodes.length == (width * height);

	const styleSection = {
		display: "grid",
		gridTemplateColumns: `repeat(${width}, min-content)`,
		width: "min-content",
		margin: "1rem"
	}

	const renderBoard = () => {
		return (
			<section style={styleSection}>
				{setupNodes.map((node, index) => {
					const isMined = typeof (node) == "string" && node == "x";
					const surroundingMines = typeof (node) == "number" && node >= 0
						? node as number
						: 0;
					return <MineNode key={index} isMined={isMined} surroundingMines={surroundingMines} visible />
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
