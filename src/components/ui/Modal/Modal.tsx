import { ReactElement, useContext } from "react";

import { ModalButtonState } from "@interfaces/ui/ModalButtonState";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";

import styles from "./Modal.module.css";
import { AiOutlineCheck, AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";
import { ModalDispatchContext } from "@contexts/ModalProvider";

export interface ModalProps {
	children?: ReactElement | ReactElement[],
	title: string;
	subtitle?: string;
	buttons: { accept: ModalButtonState, cancel: ModalButtonState }
	backdropClick?: () => void,
	closeButtonClick?: () => void,
}

export function Modal({ title, subtitle, children, buttons, backdropClick, closeButtonClick }: ModalProps) {
	const { accept, cancel } = buttons;
	const dispatch = useContext(ModalDispatchContext);

	function sendCloseModalSignal(sender: "close-button" | "backdrop-button") {
		if (sender == "close-button" && !!closeButtonClick) closeButtonClick();
		if (sender == "backdrop-button" && !!backdropClick) backdropClick();
		dispatch({ type: "close" });
	}

	function handleCancelClick() {
		if (!!cancel.click) cancel.click();
		sendCloseModalSignal("close-button");
	}

	return <section className={styles.globalContainer}>

		<article className={styles.modalContainer}>
			<header>
				<Title title={title} subtitle={subtitle} size="sm" />
				<i className={styles.closeButton} onClick={() => sendCloseModalSignal("close-button")}>
					<AiOutlineClose className="w-6 h-auto cursor-pointer"></AiOutlineClose>
				</i>
			</header>
			<main>
				{children}
			</main>
			<footer>
				<Button label={cancel.label} click={handleCancelClick} icon={<AiOutlineCloseCircle className="w-6 h-auto text-red-500" />} />
				<Button label={accept.label} click={accept.click} icon={<AiOutlineCheck className="w-6 h-auto text-lime-500" />} />
			</footer>
		</article>
		<div className={styles.backdrop} onClick={() => sendCloseModalSignal("backdrop-button")}>
		</div>
	</section>

}
