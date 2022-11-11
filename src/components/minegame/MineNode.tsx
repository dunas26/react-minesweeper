import styles from "./MineNode.module.css";

export interface MineNodeProps {
	visible?: boolean;
	surroundingMines?: number;
	isMined?: boolean;
}

export function MineNode({ visible = false, surroundingMines = 0, isMined = false }: MineNodeProps) {

	const containerClasses = () => {
		return styles.mineContainer + (isMined && visible ? ` ${styles.mined}` : "")
	}

	const renderMine = () => {
		return <p>
			{isMined ? "x" : surroundingMines != 0 ? surroundingMines.toString() : ""}
		</p>
	}

	return <article className={containerClasses()}>
		{(
			visible && renderMine()
		)}
	</article>
}
