import { ClickMode } from "@apptypes/ClickMode";
import { BoardBuildParams } from "./BoardBuildParams";
import { BoardInformation } from "./BoardInformation";
import { TimeState } from "./TimeState";

export interface BoardState {
	gamestate: 'idle' | 'preparing' | 'ongame' | 'lost' | 'won';
	board: BoardInformation;
	buildParameters: BoardBuildParams;
	timeState: TimeState;
	clickMode: ClickMode;
}
