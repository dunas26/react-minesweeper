import { ModalState } from "@interfaces/ui/ModalState"
import { ModalAction, modalReducer } from "@reducers/Modal"
import { createContext, ReactElement, useReducer } from "react"

export interface ModalProviderProps {
	children?: ReactElement | ReactElement[]
}

const initialState: ModalState = {
	show: false,
	children: [],
	title: "Information",
	buttons: {
		accept: { label: "Accept" },
		cancel: { label: "Cancel" }
	},
}

export const ModalStateContext = createContext<ModalState>(initialState)
export const ModalDispatchContext = createContext<<T>(action: ModalAction<T>) => void>(() => { })

export function ModalProvider({ children }: ModalProviderProps) {
	const [state, dispatch] = useReducer(modalReducer, initialState);
	return <ModalStateContext.Provider value={state}>
		<ModalDispatchContext.Provider value={dispatch}>
			{children}
		</ModalDispatchContext.Provider>
	</ModalStateContext.Provider>
}
