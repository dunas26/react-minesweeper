import { ReactElement } from "react";

import { ModalButtonState } from "@interfaces/ui/ModalButtonState";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";

import styles from "./Modal.module.css";
import { AiOutlineCheck, AiOutlineClose, AiOutlineCloseCircle } from "react-icons/ai";

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
	return <div className={styles.backdrop} onClick={backdropClick}>
		<article className={styles.modalContainer}>
			<header>
				<Title title={title} subtitle={subtitle} size="sm" />
				<i className={styles.closeButton}>
					<AiOutlineClose className="w-6 h-auto cursor-pointer"></AiOutlineClose>
				</i>
			</header>
			<main>
			</main>
			<footer>
				<Button label={cancel.label} click={cancel.click} icon={<AiOutlineCloseCircle className="w-6 h-auto text-red-500" />} />
				<Button label={accept.label} click={accept.click} icon={<AiOutlineCheck className="w-6 h-auto text-lime-500" />} />
			</footer>
		</article>
	</div>
}
