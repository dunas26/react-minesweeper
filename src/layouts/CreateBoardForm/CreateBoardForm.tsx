import { Input } from "@components/ui/Input/Input";
import { AiOutlineCloseCircle, AiOutlineWarning } from "react-icons/ai";

import styles from "./CreateBoardForm.module.css";

export function CreateBoardForm() {
	return <form className={styles.formContainer}>
		<section>
			<Input label="Seed" type="text" />
		</section>
		<section className={styles.boardSettings}>
			<Input label="Width" type="number" />
			<Input label="Height" type="number" />
		</section>
		<section>
			<Input label="Mine percent" type="number" />
		</section>
		<p className={styles.warningMsg}><i>
			<AiOutlineWarning className="w-4 h-auto" />
		</i>You haven't completed the board yet</p>
	</form>
}
