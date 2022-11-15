import { Modal } from "@components/ui";
import { ModalStateContext } from "@contexts/ModalProvider";
import { useContext, useState } from "react";

export function ModalDataFeeder() {
	const { title, subtitle, buttons, children, show } = useContext(ModalStateContext);
	return (show
		? <Modal title={title} subtitle={subtitle} buttons={buttons}>
			{children}
		</Modal>
		: <></>
	)
}
