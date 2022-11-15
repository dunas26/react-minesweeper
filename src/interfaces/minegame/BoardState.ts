import { ClickMode } from "@apptypes/ClickMode";
import { BoardInformation } from "./BoardInformation";
import { TimeState } from "./TimeState";

export interface BoardState {
	gamestate: 'idle' | 'preparing' | 'ongame' | 'lost' | 'won';
	board: BoardInformation;
	timeState: TimeState;
	clickMode: ClickMode;
}
