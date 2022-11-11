import { NodeData } from "@interfaces/minegame/NodeTypes";

export default {
	generate: function(columns: number, rows: number, mineFillPercent: number = 0.1) {
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
}
