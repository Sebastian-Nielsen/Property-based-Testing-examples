
interface Set<T> {
	isSubsetOf(this: Set<T>, otherSet: Set<T>): boolean;
}

interface Array<T> {
	shuffle(this: T[]): T[];
	hasNoElementsInCommonWith(this: T[], otherArray: T[]): boolean;
}
