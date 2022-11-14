import { BoardState } from "@interfaces/minegame/BoardState";
import SeedingService from "@services/Seeding.service";

export interface BoardAction {
	type: 'reset' | 'setup' | 'gameover' | 'gamestart';
}

export function BoardReducer(state: BoardState, { type }: BoardAction): BoardState {
	switch (type) {
		case "setup":
			SeedingService.changeCurrentSeed();
			return { gamestate: 'preparing' }
		case "reset":
			return { gamestate: 'preparing' }
		case "gamestart":
			return { gamestate: 'ongame' }
		case "gameover":
			return { gamestate: 'gameover' };
		default:
			throw new Error("Unhandled action on Board Reducer")
	}
}
