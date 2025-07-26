import { Character } from "../types/character";
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

        if (sortField === 'name') {
            a = characterA.name.toLowerCase();
            b = characterB.name.toLowerCase();

            return a < b ? -1 * sortOrder : 1 * sortOrder;
        }

        if (sortField === 'category') {
            a = characterA.categories.length;
            b = characterB.categories.length;

            return a < b ? -1 * sortOrder : 1 * sortOrder;
        }

        return 0;
    })
}