export type RecursivePartial<T> = T extends never | never[] ? T : {
	[P in keyof T]?: RecursivePartial<T[P]>
}
