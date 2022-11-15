export interface ModalButtonState {
	label?: string;
	display?: boolean;
	click?: ((payload?: any) => void);
}
