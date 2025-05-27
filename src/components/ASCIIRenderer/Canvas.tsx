import { createEffect, createSignal, type Component } from 'solid-js'
import { updateDataFrom2DSpace, updateDataFromImage, updateDataFromVideo, objectsRender } from './utils'
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
        values: new Array(128)
            .fill(`${new Array(128).fill(' ').join('')}\n`)
            .join(''),
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
                    setCanvas({...data, ...{ type: 'image' }})
                },
            )
        } else if (type() === 'video') {
            updateDataFromVideo(
                `/media/galaxy-${isMobile || isScaled ? '360' : '720'}p.mp4`,
                (data: { values: string; width: number; height: number }) => {
                    if (type() !== 'video' || isScaled !== fontSize() > 1) return false
                    setCanvas({...data, ...{ type: 'video' }})
                    return true
                },
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
                    setCanvas({...data, ...{ type: '2d' }})
                    return true
                },
            )
        }
    })

    return (
        <div class="relative overflow-hidden">
            <div class="absolute top-1 left-1 w-auto mr-auto flex flex-row">
                <ul class="tab-list tabbed-sidebar">
                    <li class="tab-item">
                        <a onClick={() => setType('2d')} class="tab-link" {...type() === '2d' && {'aria-selected': 'true'}}>
                            2D Space
                        </a>
                    </li>
                    <li class="tab-item">
                        <a onClick={() => setType('image')} class="tab-link" {...type() === 'image' && {'aria-selected': 'true'}}>
                            Image
                        </a>
                    </li>
                    <li class="tab-item">
                        <a onClick={() => setType('video')} class="tab-link" {...type() === 'video' && {'aria-selected': 'true'}}>
                            Video
                        </a>
                    </li>
                </ul>
                {!isMobile && (
                    <ul class="tab-list tabbed-sidebar ml-[4px] mt-0">
                            <li class="tab-item">
                            <a onClick={() => setFontSize(1)} class="tab-link" {...fontSize() === 1 && {'aria-selected': 'true'}}>
                                1px Font
                            </a>
                        </li>
                        <li class="tab-item">
                            <a onClick={() => setFontSize(2)} class="tab-link" {...fontSize() === 2 && {'aria-selected': 'true'}}>
                                2px Font
                            </a>
                        </li>
                    </ul>
                )}
            </div>
            <div class='canvas-card'>
                <span style={{
                    display: 'flex',
                    "font-family": 'monospace',
                    "font-size": `${fontSize()}px`,
                    color: 'white',
                    width: `${fontSize() * canvas().width}px`,
                    height: `${fontSize() * canvas().height}px`,
                    "line-height": '1',
                    "letter-spacing": `${
                        fontSize() * 0.3979 -
                        Math.ceil((fontSize() - 1) / 2) * 0.0001
                    }px`,
                    "white-space": 'pre',
                    margin: 'auto',
                }}>{canvas().values}</span>
            </div>
        </div>
    )
}

export default Canvas