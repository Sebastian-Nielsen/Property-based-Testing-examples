import assert from "assert";
import {filterCardProps} from "../filterCards";
import * as fc from "fast-check";


describe(`Unit-test: '${filterCardProps.name}' function`, () => {

	it(`ALWAYS returns all cards inputted when {tagsRequiredToBeIncluded} and {tagsRequiredToBeAbsent} are deactivated (=undefined)
    
    GIVEN (1) ANY number of randomly genereated cards AND (2) {tagsRequiredToBeIncluded} and {tagsRequiredToBeAbsent} are deactivated (=undefined) 
    WHEN calling ${filterCardProps.name} with (1) and (2)
    THEN the same number of cards is ALWAYS returned
    `, () => {
		fc.assert(
			fc.property(fc.array(CardArbitrary({tagsToChooseFrom: TAGS})), cards => {

				const numberOfCardsBeforeFiltering = cards.length;

				expect(
					filterCardProps({cards: cards})
				).toHaveLength(numberOfCardsBeforeFiltering);

			})
		);
	});
	it(`NEVER returns a card that contains a tag required to be absent
    
    GIVEN (1) ANY list of tags required to be absent AND (2) SOME cards 
    WHEN calling ${filterCardProps.name} with (1) and (2)
    THEN none of the returned cards SHOULD EVER contain a tag that is required to be absent
    
    `, () => {
		fc.assert(
			fc.property(
				fc.subarray(TAGS), fc.array(CardArbitrary({tagsToChooseFrom: TAGS}), {maxLength: 3}),
				(tagsRequiredToBeAbsent: TAG[], cards: CardProps[]) => {

					const cardsAfterFilterIsApplied: CardProps[] = filterCardProps({
						tagsRequiredToBeAbsent: tagsRequiredToBeAbsent,
						cards: cards
					});

					assertNoExcludedTagIsPresentIn(cardsAfterFilterIsApplied, tagsRequiredToBeAbsent);
				})
		);
	});
	it(`ALWAYS only returns cards that has all tags in {tagsRequiredToBeIncluded}
   
    GIVEN (1) ANY list of tags required to be included AND (2) SOME cards 
    WHEN calling ${filterCardProps.name} with (1) and (2)
    THEN all of the returned cards SHOULD ALWAYS have all of the tags required to be included
    `, () => {
		fc.assert(fc.property(
			fc.subarray(TAGS), fc.array(CardArbitrary({tagsToChooseFrom: TAGS}), {maxLength: 3}),
			(tagsRequiredToBeIncluded: TAG[], cards: CardProps[]) => {

				const cardsAfterFilterIsApplied: CardProps[] = filterCardProps({
					tagsRequiredToBeIncluded: tagsRequiredToBeIncluded,
					cards: cards
				});

				assertAllIncludedTagsAreIncludedIn(cardsAfterFilterIsApplied, tagsRequiredToBeIncluded);
			})
		)}
	);


})

/**
 * Private helper methods
 */

const assertAllIncludedTagsAreIncludedIn = (cards: CardProps[], tagsRequiredToBeIncluded: TAG[]) => {
	cards.forEach((card: CardProps) => {
		const tags = card.tags || [];
		assert(
			new Set(tagsRequiredToBeIncluded).isSubsetOf(new Set(tags))
		);
	})
}

const assertNoExcludedTagIsPresentIn = (cards: CardProps[], tagsRequiredToBeAbsent: TAG[]) => {
	cards.forEach((card: CardProps) => {
		const tags = card.tags || [];
		assert(tags.hasNoElementsInCommonWith(tagsRequiredToBeAbsent))
	})
}

const _generateCardWith = (tags: string[]): CardProps => {
	return {
		caption: "",
		tags: tags as TAG[]
	};
}
const _generateCards = (numberOfCardsToGenerate: number): CardProps[] => {
	const card = {
		caption: ""
	}
	return Array(numberOfCardsToGenerate).fill(card);
}

