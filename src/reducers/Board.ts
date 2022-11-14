import { ClickMode } from "@apptypes/ClickMode";
import { BoardState } from "@interfaces/minegame/BoardState";
import SeedingService from "@services/Seeding.service";

export interface BoardAction<T> {
	type: 'reset' | 'start-new' | 'set-gameover' | 'set-ongame' | 'set-idle' | 'build-state' | 'timer-counting' | 'set-mode';
	payload?: T;
}

function buildDefaultValues(): BoardState {
	return {
		clickMode: "normal",
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
}

function buildResetState(prevState: BoardState): BoardState {
	const state = { ...prevState };
	state.timeState = buildDefaultValues().timeState;
	state.board = {
		...prevState.board,
		score: 0,
		flagCount: 0,
	}
	return state;
}

export function BoardReducer<T>(state: BoardState, { type, payload }: BoardAction<T>): BoardState {
	switch (type) {
		case "build-state":
			const defaultValues = buildDefaultValues();
			const newState = {
				clickMode: state.clickMode,
				gamestate: (payload as BoardState).gamestate ?? state.gamestate ?? defaultValues.gamestate,
				board: { ...defaultValues.board, ...state.board, ...(payload as BoardState).board },
				timeState: defaultValues.timeState,
			}
			return newState;
		case "timer-counting":
			const currentElapsedSeconds = state.timeState.elapsed;
			return { ...state, timeState: { ...state.timeState, elapsed: currentElapsedSeconds + 1 } }
		case "start-new":
			SeedingService.changeCurrentSeed()
			return { ...state, gamestate: 'preparing' }
		case "reset":
			const resetState = buildResetState(state);
			return { ...resetState, gamestate: 'preparing' }
		case "set-ongame":
			return { ...state, gamestate: 'ongame' }
		case "set-gameover":
			return { ...state, gamestate: 'gameover' }
		case "set-idle":
			return { ...state, gamestate: 'idle' }
		case "set-mode":
			return { ...state, clickMode: payload as ClickMode }
		default:
			throw new Error("Unhandled action on Board Reducer")
	}
}
