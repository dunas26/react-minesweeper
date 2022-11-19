import { ClickMode } from "@apptypes/ClickMode";
import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";
import { BoardState } from "@interfaces/minegame/BoardState";
import { NodeState } from "@interfaces/minegame/NodeState";
import { WinEvaluationParams } from "@interfaces/minegame/WinEvaluationParams";
import ScoreService from "@services/Score.service";
import SeedingService from "@services/Seeding.service";

export type BoardActionType = 'reset' | 'start-new' | 'set-lost' | 'set-won' | 'set-ongame' | 'set-idle' | 'build-state' | 'timer-counting' | 'set-mode' | 'update-flagcount' | 'evaluate-win' | 'add-score';

export interface BoardAction<T> {
	type: BoardActionType;
	payload?: T;
}

function buildDefaultValues(): BoardState {
	return {
		clickMode: "normal",
		gamestate: 'preparing',
		buildParameters: {
			height: 5,
			width: 5,
			minePercent: 0.1,
		},
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
	state.buildParameters = { ...prevState.buildParameters };
	state.board = {
		...prevState.board,
		score: 0,
		flagCount: 0,
	};
	return state;
}

export function BoardReducer<T>(state: BoardState, { type, payload }: BoardAction<T>): BoardState {
	const defaultValues = buildDefaultValues();
	switch (type) {
		case "build-state":
			const newState = {
				clickMode: state.clickMode,
				gamestate: (payload as BoardState).gamestate ?? state.gamestate ?? defaultValues.gamestate,
				board: { ...defaultValues.board, ...state.board, ...(payload as BoardState).board },
				timeState: defaultValues.timeState,
				buildParameters: { ...defaultValues.buildParameters, ...state.buildParameters }
			} as BoardState
			return newState;
		case "timer-counting":
			const currentElapsedSeconds = state.timeState.elapsed;
			return { ...state, timeState: { ...state.timeState, elapsed: currentElapsedSeconds + 1 } }
		case "start-new":
			SeedingService.changeCurrentSeed()
			return { ...state, board: { ...state.board, flagCount: 0, score: 0 }, buildParameters: { ...defaultValues.buildParameters, ...(payload as BoardBuildParams) }, gamestate: 'preparing' }
		case "reset":
			const resetState = buildResetState(state);
			return { ...resetState, gamestate: 'preparing' }
		case "set-ongame":
			return { ...state, gamestate: 'ongame' }
		case "set-lost":
			return { ...state, gamestate: 'lost' }
		case "set-idle":
			return { ...state, gamestate: 'idle' }
		case "set-mode":
			return { ...state, clickMode: payload as ClickMode }
		case "update-flagcount":
			return { ...state, board: { ...state.board, flagCount: payload as number } }
		case "evaluate-win":
			const { closed } = payload as WinEvaluationParams;
			const { mineCount } = state.board;
			if (closed.length == mineCount) {
				const closedMines = closed.filter(n => n.mined).length;
				const won = closedMines == mineCount;
				if (won) state.gamestate = "won";
			}
			return { ...state }
		case "add-score":
			const { score } = state.board;
			return { ...state, board: { ...state.board, score: score + ScoreService.getScore(payload as NodeState) } }
		default:
			throw new Error("Unhandled action on Board Reducer")
	}
}
