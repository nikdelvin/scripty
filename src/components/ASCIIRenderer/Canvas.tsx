import { createEffect, createSignal, type Component } from 'solid-js'
import { updateDataFrom2DSpace, updateDataFromImage, updateDataFromVideo, objectsRender } from './utils'
import './style.css'

interface Props {
    fontSize: number
}

interface CanvasState {
    type: string
    values: string
    width: number
    height: number
}

const Canvas: Component<Props> = (props) => {
    const [type, setType] = createSignal('2d')
    const [canvas, setCanvas] = createSignal<CanvasState>({
        type: '2d',
        values: new Array(128)
            .fill(`${new Array(128).fill(' ').join('')}\n`)
            .join(''),
        width: 720,
        height: 720,
    })

    createEffect(() => {
        const isMobile = window.innerWidth < 768
        if (type() === 'image') {
            updateDataFromImage(
                `/media/galaxy-${isMobile ? '360' : '720'}p.jpeg`,
                (data: { values: string; width: number; height: number }) => {
                    setCanvas({...data, ...{ type: 'image' }})
                },
            )
        } else if (type() === 'video') {
            updateDataFromVideo(
                `/media/galaxy-${isMobile ? '360' : '720'}p.mp4`,
                (data: { values: string; width: number; height: number }) => {
                    if (type() !== 'video') return false
                    setCanvas({...data, ...{ type: 'video' }})
                    return true
                },
            )
        } else if (type() === '2d') {
            updateDataFrom2DSpace(
                {
                    width: isMobile ? 360 : 720,
                    height: isMobile ? 360 : 720,
                    objectsRender,
                    isMobile
                },
                (data: { values: string; width: number; height: number }) => {
                    if (type() !== '2d') return false
                    setCanvas({...data, ...{ type: '2d' }})
                    return true
                },
            )
        }
    })

    return (
        <div class="relative overflow-hidden">
            <div class="absolute top-1 left-1 w-auto max-w-40 mr-auto">
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
            </div>
            <div class='canvas-card'>
                <span style={{
                    display: 'flex',
                    "font-family": 'monospace',
                    "font-size": `${props.fontSize}px`,
                    color: 'white',
                    width: `${props.fontSize * canvas().width}px`,
                    height: `${props.fontSize * canvas().height}px`,
                    "line-height": '1',
                    "letter-spacing": `${
                        props.fontSize * 0.3979 -
                        Math.ceil((props.fontSize - 1) / 2) * 0.0001
                    }px`,
                    "white-space": 'pre',
                    margin: 'auto',
                }}>{canvas().values}</span>
            </div>
        </div>
    )
}

export default Canvas