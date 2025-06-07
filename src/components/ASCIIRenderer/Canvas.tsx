import { createEffect, createSignal, type Component } from 'solid-js'
import { updateDataFrom2DSpace, updateDataFromImage, updateDataFromVideo, objectsRender } from './utils'
import Tablist from '../shared/Tablist/Tablist'
import './style.css'

interface CanvasState {
    type: string
    values: string
    width: number
    height: number
}

function emptyState(type: string, isMobile: boolean) {
    return {
        type,
        values: new Array(128).fill(`${new Array(128).fill(' ').join('')}\n`).join(''),
        width: isMobile ? 360 : 720,
        height: isMobile ? 360 : 720
    }
}

const Canvas: Component = () => {
    const isMobile = window.innerWidth < 768
    const [type, setType] = createSignal('2d')
    const [fontSize, setFontSize] = createSignal(1)
    const [canvas, setCanvas] = createSignal<CanvasState>(emptyState('2d', isMobile))

    createEffect(() => {
        const isScaled = fontSize() > 1
        setCanvas(emptyState(type(), isMobile || isScaled))
        if (type() === 'image') {
            updateDataFromImage(
                `/media/galaxy-${isMobile || isScaled ? '360' : '720'}p.jpeg`,
                (data: { values: string; width: number; height: number }) => {
                    setCanvas({ ...data, ...{ type: 'image' } })
                }
            )
        } else if (type() === 'video') {
            updateDataFromVideo(
                `/media/galaxy-${isMobile || isScaled ? '360' : '720'}p.mp4`,
                (data: { values: string; width: number; height: number }) => {
                    if (type() !== 'video' || isScaled !== fontSize() > 1) return false
                    setCanvas({ ...data, ...{ type: 'video' } })
                    return true
                }
            )
        } else if (type() === '2d') {
            updateDataFrom2DSpace(
                {
                    width: isMobile || isScaled ? 360 : 720,
                    height: isMobile || isScaled ? 360 : 720,
                    objectsRender,
                    isMobile: isMobile || isScaled
                },
                (data: { values: string; width: number; height: number }) => {
                    if (type() !== '2d' || isScaled !== fontSize() > 1) return false
                    setCanvas({ ...data, ...{ type: '2d' } })
                    return true
                }
            )
        }
    })

    return (
        <div class="relative overflow-hidden">
            <div class="absolute top-1 left-1 mr-auto flex w-auto flex-row">
                <Tablist
                    list={[
                        {
                            label: '2D Space',
                            active: type() === '2d',
                            onClick: () => {
                                setType('2d')
                            }
                        },
                        {
                            label: 'Image',
                            active: type() === 'image',
                            onClick: () => {
                                setType('image')
                            }
                        },
                        {
                            label: 'Video',
                            active: type() === 'video',
                            onClick: () => {
                                setType('video')
                            }
                        }
                    ]}
                />
                {!isMobile && (
                    <Tablist
                        class="mt-0 ml-[4px]"
                        list={[
                            {
                                label: '1px Font',
                                active: fontSize() === 1,
                                onClick: () => {
                                    setFontSize(1)
                                }
                            },
                            {
                                label: '2px Font',
                                active: fontSize() === 2,
                                onClick: () => {
                                    setFontSize(2)
                                }
                            }
                        ]}
                    />
                )}
            </div>
            <div class="canvas-card">
                <span
                    style={{
                        display: 'flex',
                        'font-family': 'monospace',
                        'font-size': `${fontSize()}px`,
                        color: 'white',
                        width: `${fontSize() * canvas().width}px`,
                        height: `${fontSize() * canvas().height}px`,
                        'line-height': '1',
                        'letter-spacing': `${fontSize() * 0.3979 - Math.ceil((fontSize() - 1) / 2) * 0.0001}px`,
                        'white-space': 'pre',
                        margin: 'auto'
                    }}
                >
                    {canvas().values}
                </span>
            </div>
        </div>
    )
}

export default Canvas
