import { NodeState } from "@interfaces/minegame/NodeState";

export type ScoreKind = "normal" | "count-up";

const scoreValue = 50;
const countUpMult = 1.5;

function solveKind(mineCount: number): ScoreKind {
	return mineCount > 0 ? "count-up" : "normal";
}

function calculateScore(kind: ScoreKind, mineCount: number) {
	return kind == "normal"
		? scoreValue
		: scoreValue * countUpMult * mineCount;
}


function getScore(node: NodeState) {
	const { mineCount } = node;
	return calculateScore(solveKind(mineCount), mineCount);
}

export default {
	getScore
}
