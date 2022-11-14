import { BoardState } from "@interfaces/minegame/BoardState";
import SeedingService from "@services/Seeding.service";

export interface BoardAction<T> {
	type: 'reset' | 'setup' | 'gameover' | 'gamestart' | 'set-state';
	payload?: T;
}

export function BoardReducer<T>(state: BoardState, { type, payload }: BoardAction<T>): BoardState {
	switch (type) {
		case "set-state":
			const defaultValues: BoardState = {
				gamestate: 'preparing',
				board: {
					mineCount: 0,
					seed: "",
					flagCount: 0,
					score: 0,
				},
				timeState: {
					elapsed: 0,
					started_at: Date.now(),
					finished_at: -1
				}
			}
			const newState = {
				gamestate: (payload as BoardState).gamestate ?? state.gamestate ?? defaultValues.gamestate,
				board: { ...defaultValues.board, ...state.board, ...(payload as BoardState).board },
				timeState: { ...defaultValues.timeState, ...state.timeState, ...(payload as BoardState).timeState, },
			}
			return newState;
		case "setup":
			SeedingService.changeCurrentSeed();
			return {
				...state,
				board: {
					...state.board,
					seed: SeedingService.getCurrentState().seed
				},
				gamestate: 'preparing'
			}
		case "reset":
			return { ...state, gamestate: 'preparing' }
		case "gamestart":
			return { ...state, gamestate: 'ongame' }
		case "gameover":
			return { ...state, gamestate: 'gameover' }
		default:
			throw new Error("Unhandled action on Board Reducer")
	}
}
