import { ReactElement } from "react";
import { ModalButtonState } from "./ModalButtonState";

export interface ModalState {
	show: boolean;
	title: string;
	subtitle?: string;
	children: ReactElement | ReactElement[]
	buttons: {
		accept: ModalButtonState,
		cancel: ModalButtonState
	}
}
