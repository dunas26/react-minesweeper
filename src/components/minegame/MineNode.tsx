import { NIL } from 'uuid';
import { useEffect, useState } from "react";
import styles from "./MineNode.module.css";

export interface MineNodeProps {
	uuid?: string;
	visible?: boolean;
	surroundingMines?: number;
	isMined?: boolean;
	nodeClick?: (uuid: string) => void;
}

export function MineNode({ uuid = NIL, visible = false, surroundingMines = 0, isMined = false, nodeClick = () => { } }: MineNodeProps) {

	const [shown, setShown] = useState(visible);
	useEffect(() => {
		setShown(visible);
	}, [visible])

	const handleMineClick = function() {
		nodeClick(uuid);
	}

	const containerClasses = () => {
		return styles.mineContainer + (isMined && shown ? ` ${styles.mined}` : "") + (surroundingMines == 0 && shown && !isMined ? ` ${styles.empty}` : "") + (shown ? ` ${styles.open}` : "")
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
