import { BoardInformation } from "./BoardInformation";
import { TimeState } from "./TimeState";

export interface BoardState {
	gamestate: 'idle' | 'preparing' | 'ongame' | 'gameover';
	board: BoardInformation;
	timeState: TimeState;
}
