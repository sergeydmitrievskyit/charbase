import { Character } from "../../../types/character";
import { SortOrder } from 'primereact/api';

export const getSortedCharacters = (
    characters: Character[],
    sortField: string,
    sortOrder: SortOrder

): Character[] => {
    if (!sortField) {
        return characters
    }

    return [...characters].sort((characterA, characterB) => {
        let a, b;

        // Sort name by alphabetical order
        if (sortField === 'name') {
            a = characterA.name.toLowerCase();
            b = characterB.name.toLowerCase();

            if (a < b) return -1 * sortOrder;
            if (a > b) return 1 * sortOrder
            return 0;
        }

        // Sort category by first category in alphabetical order
        // First category is a main category for character
        // If first categories is equal we deep to the second category
        if (sortField === 'category') {
            a = characterA.categories[0].toLocaleLowerCase();
            b = characterB.categories[0].toLocaleLowerCase();

            if (a === b && characterA.categories[1] && characterB.categories[1]) {
                a = characterA.categories[1].toLocaleLowerCase();
                b = characterB.categories[1].toLocaleLowerCase();
            }

            if (a < b) return -1 * sortOrder;
            if (a > b) return 1 * sortOrder
            return 0;
        }

        return 0;
    })
}