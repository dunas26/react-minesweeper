import { createContext, ReactNode, useReducer } from "react"
import { BoardAction, BoardReducer } from "@reducers/Board";
import { BoardState } from "@interfaces/minegame/BoardState";

export const BoardStateContext = createContext<BoardState>({ gamestate: 'idle' });
export const BoardDispatcherContext = createContext<(action: BoardAction) => void>(() => { });

export interface GlobalProviderProps {
	children?: ReactNode
}

export function BoardProvider({ children = [] }: GlobalProviderProps) {
	const [state, dispatch] = useReducer(BoardReducer, { gamestate: 'idle' })
	return <BoardStateContext.Provider value={state}>
		<BoardDispatcherContext.Provider value={dispatch}>
			{children}
		</BoardDispatcherContext.Provider>
	</BoardStateContext.Provider>
}
