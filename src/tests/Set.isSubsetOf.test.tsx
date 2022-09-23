import React from "react";
import * as fc from "fast-check";
import "../../prototypes";

describe(`unit-test: Set.prototype.isSubsetOf method`, () => {

    test('An array is always a subset of itself concatenated with another array', () => {
        fc.assert(
            fc.property(fc.array(fc.string()), fc.array(fc.string()), (a: string[], b: string[]) => {
                const A = new Set(a)
                const B = new Set(b)
                return A.isSubsetOf(new Set([...A, ...B]));
            })
        );
    });

    test('A.isSubsetOf(B) is false if B is missing at least one element that A has.', () => {
        fc.assert(
            fc.property(fc.uniqueArray(fc.string(), {minLength: 1}), (array: string[]) => {

                expect(array.length).toBeGreaterThanOrEqual(1);

                const A = new Set(array);
                const B = new Set(_removeRandomElementFrom(array));

                expect(A.isSubsetOf(B)).toBeFalsy()
            })
        )
    })

})

/**
 * Private methods
 */

const _removeRandomElementFrom = (array: string[]): string[] => {
    if (array.length==0) {
        return [];
    }
    if (array.length==1) {
        return [];
    }
    const indexAtWhichToRemoveElement = Math.floor(Math.random()*array.length)
    if (indexAtWhichToRemoveElement == 0) {
        return array.splice(1);
    }

    return [...array.splice(0, indexAtWhichToRemoveElement), ...array.splice(indexAtWhichToRemoveElement)]   // https://stackoverflow.com/a/36069945/7123519

}