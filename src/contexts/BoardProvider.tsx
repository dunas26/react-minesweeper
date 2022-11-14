import { createContext, ReactNode, useReducer } from "react"
import { BoardAction, BoardReducer } from "@reducers/Board";
import { BoardState } from "@interfaces/minegame/BoardState";

const initialState: BoardState = {
	clickMode: "normal",
	gamestate: 'idle',
	board: {
		seed: "",
		flagCount: 0,
		mineCount: 0,
		score: 0,
	},
	timeState: {
		elapsed: 0,
		started_at: 0,
		finished_at: 0,
	},
};

export const BoardStateContext = createContext<BoardState>(initialState);
export const BoardDispatcherContext = createContext<<T>(action: BoardAction<T>) => void>(() => { });

export interface GlobalProviderProps {
	children?: ReactNode
}

export function BoardProvider({ children = [] }: GlobalProviderProps) {
	const [state, dispatch] = useReducer(BoardReducer, initialState)
	return <BoardStateContext.Provider value={state}>
		<BoardDispatcherContext.Provider value={dispatch}>
			{children}
		</BoardDispatcherContext.Provider>
	</BoardStateContext.Provider>
}
