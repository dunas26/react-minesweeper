import { BoardState } from "@interfaces/minegame/BoardState";

export interface BoardAction {
	type: 'setup' | 'gameover' | 'gamestart';
}

export function BoardReducer(state: BoardState, { type }: BoardAction): BoardState {
	switch (type) {
		case "setup":
			return { gamestate: 'preparing' }
		case "gamestart":
			return { gamestate: 'ongame' }
		case "gameover":
			return { gamestate: 'gameover' };
		default:
			throw new Error("Unhandled action on Board Reducer")
	}
}
