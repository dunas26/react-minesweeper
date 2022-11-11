import { Board } from "@components/minegame/Board";
import { MineNode } from "@components/minegame";
import { NodeData, SetupNodeData } from "@interfaces/minegame/NodeTypes";
import boardMineDataSolver from "@services/BoardMineDataSolver";
import BoardGenerationService from "@services/BoardGenerationService";

export function App() {

	const width = 7;
	const height = 3;
	const minePercent = 0.3;

	const originNodes: NodeData[] = BoardGenerationService.generate(width, height, minePercent);
	const setupNodes: SetupNodeData[] = boardMineDataSolver.solve(originNodes, width, height);

	return (
		<div className="App">
			<Board setupNodes={setupNodes} height={height} width={width} />
		</div>
	)
}
