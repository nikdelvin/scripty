export type PositionTurple = [number, number, number, number, number, number, number, number]

interface SlotUpgrade {
    price: number
    profitMultiplier: number
}

interface LevelSlot {
    position: PositionTurple
    animationPosition: PositionTurple
    uiPosition: PositionTurple
    clickPosition: [number, number]
    price: number
    profitValue: number
    upgradesMultiplier: number
}

export interface Level {
    slots: Record<string, LevelSlot>
    slotsUpgrades: SlotUpgrade[]
    slotStates: {
        count: number
        updateCallback: (dayCycle: number) => number
    }
    assets: {
        url: string
        suffix: string
        statesCount: number
        statesPrefix: string
        framesCount: number
        framesPrefix: string
        uiCount: number
        uiPrefix: string
    }
    ui: {
        position: {
            upgrades: PositionTurple
            money: PositionTurple
            time: PositionTurple
        }
        upgradesPages: Array<{
            slots: [number, number]
            position: PositionTurple
        }>
    }
}

const farm = {
    slots: {
        grain: {
            position: [4, 4, 5, 4, 4, 4, 5, 4],
            animationPosition: [2, 4, 3, 2, 2, 4, 3, 2],
            uiPosition: [0, 0.5, 3, 2, 0, 0.5, 3, 2],
            clickPosition: [1, 1],
            price: 5,
            profitValue: 2,
            upgradesMultiplier: 1
        },
        corn: {
            position: [12, 3, 5, 5, 12, 3, 5, 5],
            animationPosition: [16, 4, 3, 2, 16, 4, 3, 2],
            uiPosition: [0, 2.5, 3, 2, 0, 2.5, 3, 2],
            clickPosition: [1, 3],
            price: 10,
            profitValue: 3,
            upgradesMultiplier: 2
        },
        cauliflower: {
            position: [20, 4, 5, 4, 20, 4, 5, 4],
            animationPosition: [21, 6, 1, 2, 21, 6, 1, 2],
            uiPosition: [0, 4.5, 3, 2, 0, 4.5, 3, 2],
            clickPosition: [1, 5],
            price: 25,
            profitValue: 4,
            upgradesMultiplier: 5
        },
        cabbage: {
            position: [28, 4, 5, 4, 28, 4, 5, 4],
            animationPosition: [26, 3, 3, 2, 26, 3, 3, 2],
            uiPosition: [0, 6.5, 3, 2, 0, 6.5, 3, 2],
            clickPosition: [1, 7],
            price: 45,
            profitValue: 5,
            upgradesMultiplier: 9
        },
        onion: {
            position: [36, 4, 5, 4, 36, 4, 5, 4],
            animationPosition: [40, 3, 3, 2, 40, 3, 3, 2],
            uiPosition: [0, 8.5, 3, 2, 0, 8.5, 3, 2],
            clickPosition: [1, 9],
            price: 70,
            profitValue: 6,
            upgradesMultiplier: 14
        },
        carrot: {
            position: [4, 9, 5, 4, 4, 9, 5, 4],
            animationPosition: [7, 11, 1, 2, 7, 11, 1, 2],
            uiPosition: [0, 10.5, 3, 2, 0, 10.5, 3, 2],
            clickPosition: [1, 11],
            price: 100,
            profitValue: 7,
            upgradesMultiplier: 20
        },
        tomato: {
            position: [12, 8, 5, 5, 12, 8, 5, 5],
            animationPosition: [14, 11, 1, 2, 14, 11, 1, 2],
            uiPosition: [0, 12.5, 3, 2, 0, 12.5, 3, 2],
            clickPosition: [1, 13],
            price: 135,
            profitValue: 8,
            upgradesMultiplier: 27
        },
        radish: {
            position: [20, 9, 5, 4, 20, 9, 5, 4],
            animationPosition: [18, 8, 3, 2, 18, 8, 3, 2],
            uiPosition: [0, 14.5, 3, 2, 0, 14.5, 3, 2],
            clickPosition: [1, 15],
            price: 175,
            profitValue: 9,
            upgradesMultiplier: 35
        },
        turnip: {
            position: [28, 9, 5, 4, 28, 9, 5, 4],
            animationPosition: [32, 9, 3, 2, 32, 9, 3, 2],
            uiPosition: [0, 16.5, 3, 2, 0, 16.5, 3, 2],
            clickPosition: [1, 17],
            price: 220,
            profitValue: 10,
            upgradesMultiplier: 44
        },
        chiliPepper: {
            position: [36, 9, 5, 4, 36, 9, 5, 4],
            animationPosition: [39, 11, 1, 2, 39, 11, 1, 2],
            uiPosition: [0, 18.5, 3, 2, 0, 18.5, 3, 2],
            clickPosition: [1, 19],
            price: 270,
            profitValue: 11,
            upgradesMultiplier: 54
        },
        zucchini: {
            position: [4, 13, 5, 5, 4, 13, 5, 5],
            animationPosition: [8, 13, 3, 2, 8, 13, 3, 2],
            uiPosition: [0, 20.5, 3, 2, 0, 20.5, 3, 2],
            clickPosition: [1, 21],
            price: 325,
            profitValue: 12,
            upgradesMultiplier: 65
        },
        pumpkin: {
            position: [12, 13, 5, 5, 12, 13, 5, 5],
            animationPosition: [16, 16, 1, 2, 16, 16, 1, 2],
            uiPosition: [0, 22.5, 3, 2, 0, 22.5, 3, 2],
            clickPosition: [1, 23],
            price: 385,
            profitValue: 13,
            upgradesMultiplier: 77
        },
        strawberry: {
            position: [20, 14, 5, 4, 20, 14, 5, 4],
            animationPosition: [23, 16, 1, 2, 23, 16, 1, 2],
            uiPosition: [0, 24.5, 3, 2, 0, 24.5, 3, 2],
            clickPosition: [1, 25],
            price: 450,
            profitValue: 14,
            upgradesMultiplier: 90
        },
        grapes: {
            position: [28, 13, 5, 5, 28, 13, 5, 5],
            animationPosition: [32, 16, 1, 2, 32, 16, 1, 2],
            uiPosition: [0, 26.5, 3, 2, 0, 26.5, 3, 2],
            clickPosition: [1, 27],
            price: 520,
            profitValue: 15,
            upgradesMultiplier: 104
        },
        berry: {
            position: [36, 13, 5, 5, 36, 13, 5, 5],
            animationPosition: [34, 14, 3, 2, 34, 14, 3, 2],
            uiPosition: [0, 28.5, 3, 2, 0, 28.5, 3, 2],
            clickPosition: [1, 29],
            price: 595,
            profitValue: 16,
            upgradesMultiplier: 119
        },
        watermelon: {
            position: [4, 18, 5, 5, 4, 18, 5, 5],
            animationPosition: [5, 21, 1, 2, 5, 21, 1, 2],
            uiPosition: [0, 30.5, 3, 2, 0, 30.5, 3, 2],
            clickPosition: [1, 31],
            price: 675,
            profitValue: 17,
            upgradesMultiplier: 135
        },
        pineapple: {
            position: [12, 18, 5, 5, 12, 18, 5, 5],
            animationPosition: [10, 18, 3, 2, 10, 18, 3, 2],
            uiPosition: [0, 32.5, 3, 2, 0, 32.5, 3, 2],
            clickPosition: [1, 33],
            price: 760,
            profitValue: 18,
            upgradesMultiplier: 152
        },
        pricklyPear: {
            position: [20, 18, 5, 5, 20, 18, 5, 5],
            animationPosition: [24, 19, 3, 2, 24, 19, 3, 2],
            uiPosition: [0, 34.5, 3, 2, 0, 34.5, 3, 2],
            clickPosition: [1, 35],
            price: 850,
            profitValue: 19,
            upgradesMultiplier: 170
        },
        cotton: {
            position: [28, 19, 5, 4, 28, 19, 5, 4],
            animationPosition: [30, 21, 1, 2, 30, 21, 1, 2],
            uiPosition: [0, 36.5, 3, 2, 0, 36.5, 3, 2],
            clickPosition: [1, 37],
            price: 945,
            profitValue: 20,
            upgradesMultiplier: 189
        },
        appleTree: {
            position: [3, 24, 16.5, 9, 3, 24, 16.5, 9],
            animationPosition: [7, 30, 8, 3, 7, 30, 8, 3],
            uiPosition: [0, 0.5, 3, 2, 0, 0.5, 3, 2],
            clickPosition: [1, 1],
            price: 1045,
            profitValue: 22,
            upgradesMultiplier: 209
        },
        orangeTree: {
            position: [19.5, 24, 16.5, 9, 19.5, 24, 16.5, 9],
            animationPosition: [23, 30, 4, 3, 23, 30, 4, 3],
            uiPosition: [0, 2.5, 3, 2, 0, 2.5, 3, 2],
            clickPosition: [1, 3],
            price: 1155,
            profitValue: 25,
            upgradesMultiplier: 231
        },
        apricotTree: {
            position: [3, 34, 16, 8, 3, 34, 16, 8],
            animationPosition: [9, 40, 9, 2, 9, 40, 9, 2],
            uiPosition: [0, 4.5, 3, 2, 0, 4.5, 3, 2],
            clickPosition: [1, 5],
            price: 1280,
            profitValue: 28,
            upgradesMultiplier: 256
        },
        lemonTree: {
            position: [20, 33, 14, 9, 20, 33, 14, 9],
            animationPosition: [23, 40, 7, 2, 23, 40, 7, 2],
            uiPosition: [0, 6.5, 3, 2, 0, 6.5, 3, 2],
            clickPosition: [1, 7],
            price: 1420,
            profitValue: 31,
            upgradesMultiplier: 284
        },
        mapleTree: {
            position: [49, 39, 7, 3, 49, 39, 7, 3],
            animationPosition: [49, 39, 7, 3, 49, 39, 7, 3],
            uiPosition: [0, 8.5, 3, 2, 0, 8.5, 3, 2],
            clickPosition: [1, 9],
            price: 1575,
            profitValue: 34,
            upgradesMultiplier: 315
        },
        pineTree: {
            position: [63, 40, 2, 2, 63, 40, 2, 2],
            animationPosition: [63, 40, 2, 2, 63, 40, 2, 2],
            uiPosition: [0, 10.5, 3, 2, 0, 10.5, 3, 2],
            clickPosition: [1, 11],
            price: 1745,
            profitValue: 37,
            upgradesMultiplier: 349
        },
        oakTree: {
            position: [73, 41, 2, 2, 73, 41, 2, 2],
            animationPosition: [73, 41, 2, 2, 73, 41, 2, 2],
            uiPosition: [0, 12.5, 3, 2, 0, 12.5, 3, 2],
            clickPosition: [1, 13],
            price: 1930,
            profitValue: 40,
            upgradesMultiplier: 386
        },
        chicken: {
            position: [45, 4, 6, 5, 45, 4, 6, 5],
            animationPosition: [45, 4, 6, 5, 45, 4, 6, 5],
            uiPosition: [0, 0.5, 3, 2, 0, 0.5, 3, 2],
            clickPosition: [1, 1],
            price: 2130,
            profitValue: 42,
            upgradesMultiplier: 426
        },
        sheep: {
            position: [54, 3, 6, 6, 54, 3, 6, 6],
            animationPosition: [54, 3, 6, 6, 54, 3, 6, 6],
            uiPosition: [0, 2.5, 3, 2, 0, 2.5, 3, 2],
            clickPosition: [1, 3],
            price: 2340,
            profitValue: 44,
            upgradesMultiplier: 468
        },
        cow: {
            position: [62, 2, 8, 7, 62, 2, 8, 7],
            animationPosition: [62, 2, 8, 7, 62, 2, 8, 7],
            uiPosition: [0, 4.5, 3, 2, 0, 4.5, 3, 2],
            clickPosition: [1, 5],
            price: 2560,
            profitValue: 46,
            upgradesMultiplier: 512
        },
        pig: {
            position: [72, 3, 6, 6, 72, 3, 6, 6],
            animationPosition: [72, 3, 6, 6, 72, 3, 6, 6],
            uiPosition: [0, 6.5, 3, 2, 0, 6.5, 3, 2],
            clickPosition: [1, 7],
            price: 2790,
            profitValue: 48,
            upgradesMultiplier: 558
        },
        duck: {
            position: [45, 10, 7, 6, 45, 10, 7, 6],
            animationPosition: [45, 10, 7, 6, 45, 10, 7, 6],
            uiPosition: [0, 8.5, 3, 2, 0, 8.5, 3, 2],
            clickPosition: [1, 9],
            price: 3030,
            profitValue: 50,
            upgradesMultiplier: 606
        },
        furGoat: {
            position: [54, 9, 6, 7, 54, 9, 6, 7],
            animationPosition: [54, 9, 6, 7, 54, 9, 6, 7],
            uiPosition: [0, 10.5, 3, 2, 0, 10.5, 3, 2],
            clickPosition: [1, 11],
            price: 3280,
            profitValue: 52,
            upgradesMultiplier: 656
        },
        goat: {
            position: [63, 10, 6, 6, 63, 10, 6, 6],
            animationPosition: [63, 10, 6, 6, 63, 10, 6, 6],
            uiPosition: [0, 12.5, 3, 2, 0, 12.5, 3, 2],
            clickPosition: [1, 13],
            price: 3540,
            profitValue: 54,
            upgradesMultiplier: 708
        },
        donkey: {
            position: [71, 10, 7, 6, 71, 10, 7, 6],
            animationPosition: [71, 10, 7, 6, 71, 10, 7, 6],
            uiPosition: [0, 14.5, 3, 2, 0, 14.5, 3, 2],
            clickPosition: [1, 15],
            price: 3810,
            profitValue: 56,
            upgradesMultiplier: 762
        },
        fish: {
            position: [37, 28, 5, 9, 37, 28, 5, 9],
            animationPosition: [37, 28, 5, 9, 37, 28, 5, 9],
            uiPosition: [0, 16.5, 3, 2, 0, 16.5, 3, 2],
            clickPosition: [1, 17],
            price: 4090,
            profitValue: 58,
            upgradesMultiplier: 818
        },
        dog1: {
            position: [53, 17, 7, 4, 53, 17, 7, 4],
            animationPosition: [53, 17, 7, 4, 53, 17, 7, 4],
            uiPosition: [0, 18.5, 3, 2, 0, 18.5, 3, 2],
            clickPosition: [1, 19],
            price: 4380,
            profitValue: 60,
            upgradesMultiplier: 876
        },
        dog2: {
            position: [62, 17, 7, 4, 62, 17, 7, 4],
            animationPosition: [62, 17, 7, 4, 62, 17, 7, 4],
            uiPosition: [0, 20.5, 3, 2, 0, 20.5, 3, 2],
            clickPosition: [1, 21],
            price: 4680,
            profitValue: 65,
            upgradesMultiplier: 936
        },
        dog3: {
            position: [73, 16, 5, 5, 73, 16, 5, 5],
            animationPosition: [73, 16, 5, 5, 73, 16, 5, 5],
            uiPosition: [0, 22.5, 3, 2, 0, 22.5, 3, 2],
            clickPosition: [1, 23],
            price: 5005,
            profitValue: 70,
            upgradesMultiplier: 1001
        },
        wateringCan: {
            position: [71, 27, 1, 2, 71, 27, 1, 2],
            animationPosition: [71, 27, 1, 2, 71, 27, 1, 2],
            uiPosition: [0, 0.5, 3, 2, 0, 0.5, 3, 2],
            clickPosition: [1, 1],
            price: 7500,
            profitValue: 104,
            upgradesMultiplier: 1500
        },
        axe: {
            position: [71, 27, 1, 2, 71, 27, 1, 2],
            animationPosition: [71, 27, 1, 2, 71, 27, 1, 2],
            uiPosition: [0, 2.5, 3, 2, 0, 2.5, 3, 2],
            clickPosition: [1, 3],
            price: 8225,
            profitValue: 145,
            upgradesMultiplier: 1645
        },
        scissors: {
            position: [71, 27, 1, 2, 71, 27, 1, 2],
            animationPosition: [71, 27, 1, 2, 71, 27, 1, 2],
            uiPosition: [0, 4.5, 3, 2, 0, 4.5, 3, 2],
            clickPosition: [1, 5],
            price: 9240,
            profitValue: 186,
            upgradesMultiplier: 1848
        },
        fishingRod: {
            position: [71, 27, 1, 2, 71, 27, 1, 2],
            animationPosition: [71, 27, 1, 2, 71, 27, 1, 2],
            uiPosition: [0, 6.5, 3, 2, 0, 6.5, 3, 2],
            clickPosition: [1, 7],
            price: 10545,
            profitValue: 227,
            upgradesMultiplier: 2109
        },
        shovel: {
            position: [71, 27, 1, 2, 71, 27, 1, 2],
            animationPosition: [71, 27, 1, 2, 71, 27, 1, 2],
            uiPosition: [0, 8.5, 3, 2, 0, 8.5, 3, 2],
            clickPosition: [1, 9],
            price: 12130,
            profitValue: 267,
            upgradesMultiplier: 2426
        }
    },
    slotsUpgrades: [
        { price: 5, profitMultiplier: 2 },
        { price: 10, profitMultiplier: 3 },
        { price: 15, profitMultiplier: 4 },
        { price: 20, profitMultiplier: 5 }
    ],
    slotStates: {
        count: 5,
        updateCallback: (dayCycle: number) => (dayCycle > 0 ? Math.floor((dayCycle - 1) / 3) + 1 : 1)
    },
    assets: {
        url: '/media/Farm',
        suffix: '.png',
        statesCount: 5,
        statesPrefix: '/Farm_',
        framesCount: 32,
        framesPrefix: '/Farm_Animation_',
        uiCount: 5,
        uiPrefix: '/Farm_UI_'
    },
    ui: {
        position: {
            upgrades: [0, 0, 6, 40, 0, 0, 6, 40],
            money: [0, 0, 11, 3, 69, 0, 11, 3],
            time: [0, 3, 6, 1, 63, 1, 6, 1]
        },
        upgradesPages: [
            { slots: [0, 18], position: [4, 1, 1, 1, 4, 1, 1, 1] },
            { slots: [19, 25], position: [4, 3, 1, 1, 4, 3, 1, 1] },
            { slots: [26, 37], position: [4, 5, 1, 1, 4, 5, 1, 1] },
            { slots: [38, 42], position: [4, 7, 1, 1, 4, 7, 1, 1] }
        ]
    }
}

export const levels = { farm } as unknown as Record<string, Level>
