import { NodeData, SetupNodeData } from "@interfaces/minegame/NodeTypes";
import GeometryService from "@services/GeometryService";

export default {
	solve: function(nodes: NodeData[], columnSize: number, rowSize: number): SetupNodeData[] {
		const node_count = nodes.length;
		const output = [];
		for (let i = 0; i < node_count; i++) {
			const currentNode = nodes[i];
			if (currentNode === "x") {
				output.push("x");
				continue;
			}
			const currentCoordinate = GeometryService.indexToCoordinates(i, columnSize);
			let neighborMineCount = 0;
			for (let offsetY = -1; offsetY <= 1; offsetY++) {
				for (let offsetX = -1; offsetX <= 1; offsetX++) {
					if (offsetX == 0 && offsetY == 0) continue;
					const x = currentCoordinate.x + offsetX;
					const y = currentCoordinate.y + offsetY;
					if (x < 0 || x >= columnSize) continue;
					if (y < 0 || y >= rowSize) continue;
					const neighbor_idx = GeometryService.coordinatesToIndex({ x, y }, columnSize);
					const isMined = nodes[neighbor_idx] == "x";
					if (isMined) neighborMineCount++;
				}
			}
			output.push(neighborMineCount);
		}
		return output as SetupNodeData[];
	}
}
