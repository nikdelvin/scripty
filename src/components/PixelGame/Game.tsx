import { createEffect, createSignal, type Component } from 'solid-js'
import { generateLevel, font } from './utils'
import { type PositionTurple, type Level } from './levels'
import './style.css'

declare global {
    interface Window {
        animationFrame: number
        animationLoop: number
        purchaseAnimation: number
        dayLoop: number
        gameState: {
            levels?: {
                [key: string]: {
                    slotsUpgrades: Record<string, number>
                    slotsActive: Record<string, boolean>
                }
            }
            dayCycle?: number
            playerMoney?: number
        }
        levelConfig?: Level
    }
}

const Game: Component = () => {
    const isMobile = window.innerWidth < 768
    window.gameState = JSON.parse(localStorage.getItem('gameState') ?? '{}')
    const [level] = createSignal('farm')
    const [levelLoaded, setLevelLoaded] = createSignal(false)
    const [levelImages, setLevelImages] = createSignal<{
        states?: HTMLImageElement[]
        frames?: HTMLImageElement[]
        ui?: HTMLImageElement[]
        font?: HTMLImageElement
    }>({})
    const [activeSlots, setActiveSlots] = createSignal<Record<string, boolean>>(
        window.gameState?.levels?.[level()]?.slotsActive ?? {}
    )
    const [purchaseAnimation, setPurchaseAnimation] = createSignal<string | false>(false)
    const [dayCycle, setDayCycle] = createSignal<number>(window.gameState?.dayCycle ?? 0)
    const [slotsUpgrades, setSlotsUpgrades] = createSignal<Record<string, number>>(
        window.gameState?.levels?.[level()]?.slotsUpgrades ?? {}
    )
    const [upgradesPage, setUpgradesPage] = createSignal<number>(0)
    const [playerMoney, setPlayerMoney] = createSignal(window.gameState?.playerMoney ?? 5)

    function styleFromPosition(posArray: number[]) {
        return {
            position: 'absolute' as const,
            left: `${posArray[0] * aspectWidth}px`,
            top: `${posArray[1] * aspectHeight}px`,
            width: `${48 * aspectWidth}px`,
            height: `${48 * aspectHeight}px`
        }
    }

    function updateUi(ctx: CanvasRenderingContext2D, uiPosition: Record<string, PositionTurple>) {
        for (const uiSlot of Object.keys(uiPosition)) {
            switch (uiSlot) {
                case 'upgrades':
                    ctx.drawImage(
                        levelImages().ui![upgradesPage()],
                        ...(uiPosition.upgrades.map(
                            (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                        ) as PositionTurple)
                    )
                    break
                case 'money':
                    ctx.drawImage(
                        levelImages().ui![4],
                        ...(uiPosition[uiSlot].map((pos) => pos * 48) as PositionTurple)
                    )
                    break
                case 'time':
                    ctx.drawImage(
                        levelImages().ui![4],
                        ...(uiPosition[uiSlot].toSpliced(0, 1, dayCycle() * 6).map((pos) => pos * 48) as PositionTurple)
                    )
                    break
            }
        }
    }
    const innerWidth = isMobile ? 360 : 720
    const innerHeight = isMobile ? 203 : 405
    const aspectRatio = innerWidth / innerHeight
    const aspectWidth = aspectRatio < 1.7777 ? innerWidth / 3840 : (innerHeight * 1.7777) / 3840
    const aspectHeight = aspectRatio > 1.7777 ? innerHeight / 2160 : innerWidth / 1.7777 / 2160
    const styleWidth = `${aspectRatio < 1.7777 ? innerWidth : innerHeight * 1.7777}px`
    const styleHeight = `${aspectRatio > 1.7777 ? innerHeight : innerWidth / 1.7777}px`

    createEffect(() => {
        const levelConfig = generateLevel(level())
        window.levelConfig = levelConfig
        const levelImgs = [] as HTMLImageElement[]
        const levelFrames = [] as HTMLImageElement[]
        const levelUIs = [] as HTMLImageElement[]
        const levelStates = Array.from(new Array(levelConfig.assets.statesCount).keys())
        for (const levelState of levelStates) {
            const levelImg = new Image()
            levelImg.addEventListener('load', () => {
                levelImgs.push(levelImg)
                if (levelImgs.length === levelConfig.assets.statesCount) {
                    levelImgs.sort(
                        (a, b) =>
                            Number(
                                a.src.split(levelConfig.assets.statesPrefix)[1].split(levelConfig.assets.suffix)[0]
                            ) -
                            Number(b.src.split(levelConfig.assets.statesPrefix)[1].split(levelConfig.assets.suffix)[0])
                    )
                    const levelAnimations = Array.from(new Array(levelConfig.assets.framesCount).keys())
                    for (const levelAnimation of levelAnimations) {
                        const levelFrame = new Image()
                        levelFrame.addEventListener('load', () => {
                            levelFrames.push(levelFrame)
                            if (levelFrames.length === levelConfig.assets.framesCount) {
                                levelFrames.sort(
                                    (a, b) =>
                                        Number(
                                            a.src
                                                .split(levelConfig.assets.framesPrefix)[1]
                                                .split(levelConfig.assets.suffix)[0]
                                        ) -
                                        Number(
                                            b.src
                                                .split(levelConfig.assets.framesPrefix)[1]
                                                .split(levelConfig.assets.suffix)[0]
                                        )
                                )
                                const levelInterfaces = Array.from(new Array(levelConfig.assets.uiCount).keys())
                                for (const levelInterface of levelInterfaces) {
                                    const levelUI = new Image()
                                    levelUI.addEventListener('load', () => {
                                        levelUIs.push(levelUI)
                                        if (levelUIs.length === levelConfig.assets.uiCount) {
                                            levelUIs.sort(
                                                (a, b) =>
                                                    Number(
                                                        a.src
                                                            .split(levelConfig.assets.uiPrefix)[1]
                                                            .split(levelConfig.assets.suffix)[0]
                                                    ) -
                                                    Number(
                                                        b.src
                                                            .split(levelConfig.assets.uiPrefix)[1]
                                                            .split(levelConfig.assets.suffix)[0]
                                                    )
                                            )
                                            const uiFont = new Image()
                                            uiFont.addEventListener('load', () => {
                                                setLevelImages({
                                                    states: levelImgs,
                                                    frames: levelFrames,
                                                    ui: levelUIs,
                                                    font: uiFont
                                                })
                                                window.animationFrame = 0
                                                setLevelLoaded(true)
                                            })
                                            uiFont.src = '/media/Farm/Font.png'
                                        }
                                    })
                                    levelUI.src = `${levelConfig.assets.url}${levelConfig.assets.uiPrefix}${levelInterface + 1}${levelConfig.assets.suffix}`
                                }
                            }
                        })
                        levelFrame.src = `${levelConfig.assets.url}${levelConfig.assets.framesPrefix}${levelAnimation + 1}${levelConfig.assets.suffix}`
                    }
                }
            })
            levelImg.src = `${levelConfig.assets.url}${levelConfig.assets.statesPrefix}${levelState + 1}${levelConfig.assets.suffix}`
        }
    })
    createEffect(() => {
        if (levelLoaded()) {
            const canvas = document.querySelector('#game-canvas') as HTMLCanvasElement
            canvas.style.width = styleWidth
            canvas.style.height = styleHeight
            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
            const levelSlots = window.levelConfig?.slots!
            const levelSlotsUpgrades = window.levelConfig?.slotsUpgrades!
            const upgradesPages = window.levelConfig?.ui?.upgradesPages!
            if (window.animationLoop != null) clearInterval(window.animationLoop)
            window.animationLoop = setInterval(() => {
                ctx.drawImage(levelImages().states![0], 0, 0)
                for (const slot of Object.keys(activeSlots())) {
                    ctx.drawImage(
                        levelImages().states![dayCycle() > 0 ? Math.floor((dayCycle() - 1) / 3) + 1 : 1],
                        ...(levelSlots[slot].position!.map((pos) => pos * 48) as PositionTurple)
                    )
                    ctx.drawImage(
                        levelImages().frames![window.animationFrame],
                        ...(levelSlots[slot].animationPosition!.map((pos) => pos * 48) as PositionTurple)
                    )
                }
                updateUi(ctx, window.levelConfig?.ui.position!)
                for (const [index, digit] of playerMoney().toString().padStart(8, '0').split('').entries()) {
                    ctx.drawImage(
                        levelImages().font!,
                        ...(font.digits(Number(digit), [71 + index, 1, 1, 1]).map((pos) => pos * 48) as PositionTurple)
                    )
                }
                for (const [slot, slotData] of Object.entries(levelSlots)) {
                    if (
                        Object.keys(levelSlots).indexOf(slot) >= upgradesPages[upgradesPage()].slots[0] &&
                        Object.keys(levelSlots).indexOf(slot) <= upgradesPages[upgradesPage()].slots[1]
                    ) {
                        if (purchaseAnimation() === slot) {
                            if (window.purchaseAnimation == null) window.purchaseAnimation = 0
                            if (window.purchaseAnimation === 4) {
                                setPurchaseAnimation(false)
                                window.purchaseAnimation = 0
                            } else {
                                ctx.drawImage(
                                    levelImages().ui![upgradesPage()],
                                    ...(levelSlots[slot]
                                        .uiPosition!.toSpliced(0, 1, (window.purchaseAnimation + 11) * 6)
                                        .map(
                                            (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                                        ) as PositionTurple)
                                )
                                window.purchaseAnimation += 1
                            }
                        } else {
                            if (Object.keys(activeSlots()).includes(slot)) {
                                if (
                                    (levelSlotsUpgrades[slotsUpgrades()[slot] ?? 0]?.price ?? Infinity) *
                                        slotData.upgradesMultiplier! <=
                                    playerMoney()
                                ) {
                                    ctx.drawImage(
                                        levelImages().ui![upgradesPage()],
                                        ...(levelSlots[slot]
                                            .uiPosition!.toSpliced(0, 1, ((slotsUpgrades()[slot] ?? 0) * 2 + 3) * 6)
                                            .map(
                                                (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                                            ) as PositionTurple)
                                    )
                                } else
                                    ctx.drawImage(
                                        levelImages().ui![upgradesPage()],
                                        ...(levelSlots[slot]
                                            .uiPosition!.toSpliced(0, 1, ((slotsUpgrades()[slot] ?? 0) * 2 + 2) * 6)
                                            .map(
                                                (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                                            ) as PositionTurple)
                                    )
                            } else {
                                if (slotData.price! <= playerMoney())
                                    ctx.drawImage(
                                        levelImages().ui![upgradesPage()],
                                        ...(levelSlots[slot]
                                            .uiPosition!.toSpliced(0, 1, 6)
                                            .map(
                                                (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                                            ) as PositionTurple)
                                    )
                                else
                                    ctx.drawImage(
                                        levelImages().ui![upgradesPage()],
                                        ...(levelSlots[slot].uiPosition!.map(
                                            (pos, index) => pos * 48 + (index === 0 || index === 1 ? 6 : 0)
                                        ) as PositionTurple)
                                    )
                            }
                        }
                    }
                }
                if (window.animationFrame === 31) {
                    window.animationFrame = 0
                } else {
                    window.animationFrame += 1
                }
            }, 100) as unknown as number
        }
    })
    createEffect(() => {
        if (levelLoaded()) {
            const levelSlots = window.levelConfig?.slots!
            const levelSlotsUpgrades = window.levelConfig?.slotsUpgrades!
            if (window.dayLoop != null) clearInterval(window.dayLoop)
            window.dayLoop = setInterval(() => {
                if (dayCycle() === 12) {
                    let total = 0
                    for (const slot of Object.keys(activeSlots())) {
                        total +=
                            (levelSlotsUpgrades[slotsUpgrades()[slot] - 1]?.profitMultiplier ?? 1) *
                            levelSlots[slot].profitValue!
                    }
                    setPlayerMoney((prevMoney) => prevMoney + Math.ceil(total))
                }
                setDayCycle((prev) => (prev !== 12 ? prev + 1 : 0))
            }, 500) as unknown as number
        }
    })
    createEffect(() => {
        if (levelLoaded()) {
            if (window.gameState.levels == null) window.gameState = { levels: {} }
            if (window.gameState.levels![level()]?.slotsActive == null)
                window.gameState.levels![level()] = { slotsActive: {}, slotsUpgrades: {} }
            window.gameState.levels![level()].slotsActive = activeSlots()
            window.gameState.levels![level()].slotsUpgrades = slotsUpgrades()
            window.gameState.dayCycle = dayCycle()
            window.gameState.playerMoney = playerMoney()
            localStorage.setItem('gameState', JSON.stringify(window.gameState))
        }
    })

    return (
        <div class="relative overflow-hidden">
            <div
                id="game-canvas-div"
                class={
                    isMobile ? `canvas-card relative h-[203px] w-[360px]` : `canvas-card relative h-[405px] w-[720px]`
                }
            >
                <div
                    class={isMobile ? `h-[203px] w-[360px]` : `h-[405px] w-[720px]`}
                    style="z-index: 2;position: absolute;top: 0px;left: 0px;display: flex;justify-content: center;align-items: center;"
                >
                    {levelLoaded() && (
                        <div style={{ width: styleWidth, height: styleHeight, position: 'relative' }}>
                            {Object.entries(window.levelConfig?.slots!)
                                .slice(
                                    window.levelConfig!.ui.upgradesPages[upgradesPage()].slots[0],
                                    window.levelConfig!.ui.upgradesPages[upgradesPage()].slots[1] + 1
                                )
                                .map((levelSlot) => (
                                    <div
                                        id={levelSlot[0]}
                                        style={styleFromPosition(levelSlot[1].clickPosition!.map((pos) => pos * 48))}
                                        onClick={() => {
                                            if (activeSlots()[levelSlot[0]] == null) {
                                                if (levelSlot[1].price! <= playerMoney()) {
                                                    setPurchaseAnimation(levelSlot[0])
                                                    setPlayerMoney((prev) => prev - levelSlot[1].price!)
                                                    setActiveSlots((prev) => {
                                                        prev[levelSlot[0]] = true
                                                        return { ...prev }
                                                    })
                                                }
                                            } else if (
                                                (window.levelConfig?.slotsUpgrades[slotsUpgrades()[levelSlot[0]] ?? 0]
                                                    ?.price ?? Infinity) *
                                                    levelSlot[1].upgradesMultiplier! <=
                                                playerMoney()
                                            ) {
                                                setPurchaseAnimation(levelSlot[0])
                                                setPlayerMoney(
                                                    (prev) =>
                                                        prev -
                                                        (window.levelConfig?.slotsUpgrades[
                                                            slotsUpgrades()[levelSlot[0]] ?? 0
                                                        ]?.price ?? Infinity) *
                                                            levelSlot[1].upgradesMultiplier!
                                                )
                                                setSlotsUpgrades((prev) => {
                                                    prev[levelSlot[0]] = (prev[levelSlot[0]] ?? 0) + 1
                                                    return { ...prev }
                                                })
                                            }
                                        }}
                                    ></div>
                                ))}
                            {window.levelConfig!.ui.upgradesPages.map((upgradesPage, index) => (
                                <div
                                    id={`upgradesPage_${index}`}
                                    style={styleFromPosition(upgradesPage.position!.map((pos) => pos * 48))}
                                    onClick={() => {
                                        setUpgradesPage(index)
                                    }}
                                ></div>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    class={isMobile ? `!mt-0 h-[203px] w-[360px]` : `!mt-0 h-[405px] w-[720px]`}
                    style="z-index: 1;position: absolute;top: 0px;left: 0px;display: flex;justify-content: center;align-items: center;"
                >
                    <canvas
                        id="game-canvas"
                        width="3840"
                        height="2160"
                    ></canvas>
                </div>
            </div>
        </div>
    )
}

export default Game
