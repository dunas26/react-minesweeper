export interface NodeState {
	uuid: string;
	mineCount: number;
	mined: boolean;
	open: boolean;
	flagged: boolean;
	neighbors?: NodeState[];
}
