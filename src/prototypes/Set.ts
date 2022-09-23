
// I know prototypes are bad ... but I use them anyways in personal projects that I know
// no one else is ever going to use as it makes for substantially cleaner code
// I have guards to ensure the prototype method hasn't been defined before I overwrite it


const IS_SUBSET_OF = "isSubsetOf"
if (Set.prototype.hasOwnProperty(IS_SUBSET_OF)) {
	throw new Error("Set.prototype.isSubsetOf has already been defined!")
} else {
	Object.defineProperty(Set.prototype, IS_SUBSET_OF, {
		value: function<T> (this: Set<T>, otherSet: Set<T>): boolean {

			if (this.size > otherSet.size) {
				return false;
			}

			for (const elem of this) {
				if (!otherSet.has(elem)) {
					return false;
				}
			}

			return true;
		},
		writable: true,
		configurable: true
	});
}


export {}


