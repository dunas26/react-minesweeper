import { BoardInformation } from "./BoardInformation";
import { NodeData } from "./NodeTypes";

export interface BoardGameData extends Omit<BoardInformation, 'flagCount' | 'score'> {
	grid: NodeData[];
}
