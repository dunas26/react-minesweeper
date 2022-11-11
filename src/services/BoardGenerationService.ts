import { v4 as uuidv4 } from 'uuid';
import { NodeState } from "@interfaces/minegame/NodeState";
import { NodeData, SetupNodeData } from "@interfaces/minegame/NodeTypes";
import GeometryService from "./GeometryService";

function generate(columns: number, rows: number, mineFillPercent: number = 0.1) {
	const totalRows = columns * rows;
	let grid = new Array<NodeData>(totalRows).fill(" " as NodeData);
	let mineCount = Math.floor(totalRows * mineFillPercent);

	if (mineCount > totalRows) mineCount = totalRows;
	if (mineCount < 0) mineCount = 0.05 * totalRows;

	for (let i = 0; i < mineCount;) {
		const randomIdx = Math.floor(Math.random() * columns * rows);
		const randomNode = grid[randomIdx];
		if (randomNode != "x") {
			grid[randomIdx] = "x";
			i++;
		}
	}

	return grid;
}

function buildInitialState(setupNodes: SetupNodeData[], width: number, height: number): NodeState[] {
	const output: NodeState[] = setupNodes.map((data) => {
		return {
			uuid: uuidv4(),
			flagged: false,
			open: false,
			mineCount: typeof data == "number" ? data : 0,
			mined: typeof data == "string" && data == "x",
		}
	});
	output.forEach((state, idx) => state.neighbors = fetchNeighbors(output, idx, width, height));
	return output;
}

function fetchNeighbors(nodes: NodeState[], idx: number, width: number, height: number) {
	const currentCoordinates = GeometryService.indexToCoordinates(idx, width);
	const neighbors: NodeState[] = [];
	for (let offsetY = -1; offsetY <= 1; offsetY++) {
		for (let offsetX = -1; offsetX <= 1; offsetX++) {
			const x = currentCoordinates.x + offsetX;
			const y = currentCoordinates.y + offsetY;
			if (!GeometryService.validCoordinate({ x, y }, width, height)) continue;
			const neighborIdx = GeometryService.coordinatesToIndex({ x, y }, width);
			neighbors.push(nodes[neighborIdx]);
		}
	}
	return neighbors;
}

export default {
	generate, buildInitialState, fetchNeighbors
}
