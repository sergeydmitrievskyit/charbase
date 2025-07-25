export interface Character {
    id: number,
    name: string,
    categories: string[]
}

export interface CharacterEditForm {
    name: string,
    categories: string[]
}