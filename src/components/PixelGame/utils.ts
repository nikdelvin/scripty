import { levels } from './levels'

export const font = {
    en: {
        a: [0, 0, 1, 1]
    },
    digits: (digit: number, position: [number, number, number, number]) => {
        return [digit, 17, 1, 1].concat(position) as [number, number, number, number, number, number, number, number]
    }
}

export function generateLevel(key: string) {
    return levels[key]
}
