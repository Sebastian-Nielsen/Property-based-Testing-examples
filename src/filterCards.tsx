import {CardProps} from "./Card";

export enum TAG {

}

export interface CardProps {
	caption: string;
	extraCaption?: string;
	tags?: TAG[];
	images?: string[];
	more?: {
		theIdea: string,
		parameters: [] | string[]
	};
}

export const mapToCards = (cards: CardProps[]): JSX.Element[] => {
	return cards.map(
		(cardProps: CardProps, index: number) => <Card {...cardProps} key={index}/>
	);
}

/**
 * Return all cardProps that includes all {@param params.tagsRequiredToBeIncluded}
 * and that doesn't include any {@param params.tagsRequiredToBeAbsent}
 *
 * if {@param params.tagsRequiredToBeIncluded} is {undefined} then this constraint is deactivated
 * if {@param params.tagsRequiredToBeAbsent}   is {undefined} then this constraint is deactivated
 *
 * @param params.cards - list of cardProps for each card to choose from, defaults to cardProps of all cards.
 */
export const filterCardProps = (
	params: {
		tagsRequiredToBeIncluded?: string[],
		tagsRequiredToBeAbsent?: string[],
		cards?: CardProps[],
	}
): CardProps[] => {
	const {
		tagsRequiredToBeAbsent,
		tagsRequiredToBeIncluded,
		cards = cardPropsData,
	} = params;

	return cards
		.filter(cardProps => {
			const tags = cardProps.tags || [];
			return areAllRequiredTagsIn(tags, tagsRequiredToBeIncluded) &&
				areAllExcludedTagsAbsentIn(tags, tagsRequiredToBeAbsent);
		})
}


/**
 * @param tags  -  tags for which to check that all {@param tags} are absent from.
 * @param tagsRequiredToBeAbsent
 *
 * @return true, if all {@param tagsRequiredToBeAbsent} are absent from {@param tags}
 * @return true, if {@param tagsRequiredToBeAbsent} is {undefined}, since that conveys the
 *       constraint 'tagsRequiredToBeAbsent' is deactivated.
 * @return false otherwise
 */
const areAllExcludedTagsAbsentIn = (
	tags: string[], tagsRequiredToBeAbsent?: string[]
): boolean => {
	if (tagsRequiredToBeAbsent === undefined) {
		return true;
	}
	const tagsToBeAbsent = new Set(tagsRequiredToBeAbsent);
	for (let i = 0; i < tags.length; i++) {
		if (tagsToBeAbsent.has(tags[i])) {
			return false;
		}
	}
	return true;
}


/**
 * @param tags  -  tags for which to check that all {@param tagsReqiuredToBeIncluded} are included.
 * @param tagsReqiuredToBeIncluded
 *
 * @return true, if all {@param tagsReqiuredToBeIncluded} are in included in {@param tags}
 * @return true, if {@param tagsReqiuredToBeIncluded} is {undefined}, since that conveys the
 *       constraint 'tagsRequiredToBeIncluded' is deactivated.
 * @return false otherwise
 */
const areAllRequiredTagsIn = (
	tags: string[], tagsReqiuredToBeIncluded?: string[]
): boolean => {
	if (tagsReqiuredToBeIncluded === undefined) {
		return true;
	}
	return new Set(tagsReqiuredToBeIncluded).isSubsetOf(new Set(tags));
}

