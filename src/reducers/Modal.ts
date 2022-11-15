import { ModalState } from "@interfaces/ui/ModalState";
import { RecursivePartial } from "@utils/types";

export type ModalActionType = "open" | "close" | "update" | "set-payload";

export interface ModalAction<T> {
	type: ModalActionType,
	payload?: RecursivePartial<T>
}

const defaultValues: ModalState = {
	show: false,
	children: [],
	title: "Information",
	storedPayload: undefined,
	buttons: {
		accept: { label: "Accept" },
		cancel: { label: "Cancel" }
	},
}

export function modalReducer<T>(state: ModalState, { type, payload }: ModalAction<T>) {
	switch (type) {
		case "open":
			const { buttons } = payload as RecursivePartial<ModalState>;
			const accept = buttons?.accept ?? {};
			const cancel = buttons?.cancel ?? {};
			const stateButtons = {
				accept: { ...defaultValues.buttons.accept, ...accept },
				cancel: { ...defaultValues.buttons.cancel, ...cancel },
			} as typeof buttons;
			return { ...defaultValues, ...payload, buttons: stateButtons, show: true } as ModalState
		case "close":
			return { ...state, show: false } as ModalState
		case "update":
			return state;
		case "set-payload":
			return { ...state, storedPayload: payload } as ModalState
		default:
			throw new Error("Unhandled modal action type");
	}
}
