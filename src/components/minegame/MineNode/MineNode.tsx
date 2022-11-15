import { NIL } from 'uuid';
import { useEffect, useState } from "react";

import styles from "./MineNode.module.css";
import flag from "@assets/flag.svg";

export interface MineNodeProps {
	uuid?: string;
	visible?: boolean;
	surroundingMines?: number;
	isMined?: boolean;
	isFlagged?: boolean;
	nodeClick?: (uuid: string) => void;
	rightClick?: (uuid: string) => void;
}

export function MineNode({ uuid = NIL, visible = false, surroundingMines = 0, isMined = false, nodeClick = () => { }, rightClick = () => { }, isFlagged = false }: MineNodeProps) {

	const [shown, setShown] = useState(visible);
	useEffect(() => {
		setShown(visible);
	}, [visible])

	function disableContextMenu(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		e.preventDefault();
	}

	function handleMineClick() {
		nodeClick(uuid);
	}

	function handleRightClick() {
		rightClick(uuid)
	}

	const containerClasses = () => {
		return styles.mineContainer + (isMined && shown ? ` ${styles.mined}` : "") + (surroundingMines == 0 && shown && !isMined ? ` ${styles.empty}` : "") + (shown ? ` ${styles.open}` : "")
	}

	function renderFlag() {
		return <img src={flag} />
	}

	function renderMine() {
		return <p>
			{isMined ? "x" : surroundingMines != 0 ? surroundingMines.toString() : ""}
		</p>
	}

	return <article className={containerClasses()} onClick={handleMineClick} onAuxClick={handleRightClick} onContextMenu={disableContextMenu}>
		{
			isFlagged ? renderFlag() : (shown && renderMine())
		}
	</article>
}
