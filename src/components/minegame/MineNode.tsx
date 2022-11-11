import { useEffect, useState } from "react";
import styles from "./MineNode.module.css";

export interface MineNodeProps {
	visible?: boolean;
	surroundingMines?: number;
	isMined?: boolean;
	nodeClick?: () => void;
}

export function MineNode({ visible = false, surroundingMines = 0, isMined = false }: MineNodeProps) {

	const [shown, setShown] = useState(visible);
	useEffect(() => {
		setShown(visible);
	}, [visible])

	const handleMineClick = function() {
		setShown(true)
	}

	const containerClasses = () => {
		return styles.mineContainer + (isMined && shown ? ` ${styles.mined}` : "") + (surroundingMines == 0 && shown && !isMined ? ` ${styles.empty}` : "")
	}

	const renderMine = () => {
		return <p>
			{isMined ? "x" : surroundingMines != 0 ? surroundingMines.toString() : ""}
		</p>
	}

	return <article className={containerClasses()} onClick={handleMineClick}>
		{(
			shown && renderMine()
		)}
	</article>
}
