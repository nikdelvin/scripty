import { createEffect, createSignal, type Component } from 'solid-js'
import { prepareMap, drawMap } from './utils'
import Tablist from '../shared/Tablist/Tablist'
import Input from '../shared/Input/Input'
import Button from '../shared/Button/Button'
import { type TypedArray } from 'geotiff'
import './style.css'

type Points = 'Null Island' | 'Everest' | 'Mariana Trench'

interface Circle {
    center: {
        x: number
        y: number
    }
    radius: number
    speed: number
}

const Map: Component = () => {
    const isMobile = window.innerWidth < 768
    let canvas: HTMLCanvasElement | undefined
    const points = {
        'Null Island': [0, 0],
        Everest: [27.988093, 86.924972],
        'Mariana Trench': [11.346521, 142.197337]
    }
    const [map, setMap] = createSignal<{ width: number; raster: TypedArray; gpsToPixel: number[] }>()
    const [point, setPoint] = createSignal<Points | null>(null)
    const [fullMap, setFullMap] = createSignal(true)
    const [zoom, setZoom] = createSignal(1)
    const [quality, setQuality] = createSignal(1)
    const [levels, setLevels] = createSignal(100)
    const [settings, setSettings] = createSignal({
        zoom: 1,
        quality: 1,
        levels: 100,
        grayScale: false
    })

    createEffect(async () => {
        const currentMap = await prepareMap()
        setMap(currentMap)
    })

    createEffect(async () => {
        const context = canvas!.getContext('2d')!
        const currentMap = map()
        if (currentMap != null) {
            context.fillStyle = '#ffffff'
            context.fillRect(0, 0, canvas!.width, canvas!.height)
            const currentSettings = settings()
            const body = {
                lat: points[point() ?? 'Null Island'][0],
                lng: points[point() ?? 'Null Island'][1],
                zoom: currentSettings.zoom,
                quality: currentSettings.quality,
                levels: currentSettings.levels,
                grayScale: currentSettings.grayScale,
                fullMap: fullMap()
            }
            const payload = drawMap(body, currentMap)
            for (const [index, group] of Object.entries(payload.heightGroups)) {
                for (const coord of group as any[]) {
                    context.fillStyle = index
                    context.fillRect(coord[0], coord[1], payload.deltaX, payload.deltaY)
                }
            }
        } else {
            var bigCircle = {
                center: {
                    x: 960,
                    y: 540
                },
                radius: 250,
                speed: 4
            }
            var smallCirlce = {
                center: {
                    x: 960,
                    y: 540
                },
                radius: 150,
                speed: 2
            }
            var progress = 0
            function loading() {
                if (map() == null) {
                    context.clearRect(0, 0, canvas!.width, canvas!.height)
                    progress += 0.01
                    if (progress > 1) {
                        progress = 0
                    }
                    drawCircle(bigCircle, progress)
                    drawCircle(smallCirlce, progress)
                    requestAnimationFrame(loading)
                }
            }
            loading()
            function drawCircle(circle: Circle, progress: number) {
                context.beginPath()
                var start = accelerateInterpolator(progress) * circle.speed
                var end = decelerateInterpolator(progress) * circle.speed
                context.arc(
                    circle.center.x,
                    circle.center.y,
                    circle.radius,
                    (start - 0.5) * Math.PI,
                    (end - 0.5) * Math.PI
                )
                context.lineWidth = 3
                context.fillStyle = '#18181b'
                context.strokeStyle = '#ffffff'
                context.fill()
                context.stroke()
            }
            function accelerateInterpolator(x: number) {
                return x * x
            }
            function decelerateInterpolator(x: number) {
                return 1 - (1 - x) * (1 - x)
            }
        }
    })

    return (
        <div class="relative overflow-hidden">
            <div class="absolute top-1 left-1 mr-auto flex w-auto flex-col">
                <Tablist
                    class="!mb-1"
                    list={Object.keys(points)
                        .map((p) => ({
                            label: p,
                            active: point() === p,
                            onClick: () => {
                                setPoint(p as Points)
                                setFullMap(false)
                            }
                        }))
                        .concat([
                            {
                                label: 'Full Map',
                                active: fullMap(),
                                onClick: () => {
                                    setFullMap(true)
                                    setPoint(null)
                                }
                            }
                        ])}
                />
                {!isMobile && (
                    <Tablist
                        class="mt-0"
                        list={
                            fullMap()
                                ? [
                                      {
                                          label: 'Color Levels',
                                          child: (
                                              <Input
                                                  onChange={(e) => {
                                                      setLevels(Number(e.target.value))
                                                  }}
                                                  value={levels()}
                                                  type="number"
                                                  min="2"
                                                  max="100"
                                                  class="w-[70px]"
                                              />
                                          )
                                      },
                                      {
                                          child: (
                                              <Button
                                                  onClick={(e) => {
                                                      setSettings({
                                                          zoom: zoom(),
                                                          quality: quality(),
                                                          levels: levels(),
                                                          grayScale: false
                                                      })
                                                  }}
                                                  class="w-full !justify-center !rounded-[var(--tab-item-border-radius)] !text-center"
                                                  title="Apply Settings"
                                              />
                                          )
                                      }
                                  ]
                                : [
                                      {
                                          label: 'Zoom',
                                          child: (
                                              <Input
                                                  onChange={(e) => {
                                                      setZoom(Number(e.target.value))
                                                  }}
                                                  value={zoom()}
                                                  type="number"
                                                  min="0"
                                                  max="1"
                                                  class="w-[70px]"
                                              />
                                          )
                                      },
                                      {
                                          label: 'Quality',
                                          child: (
                                              <Input
                                                  onChange={(e) => {
                                                      setQuality(Number(e.target.value))
                                                  }}
                                                  value={quality()}
                                                  type="number"
                                                  min="1"
                                                  max="6"
                                                  class="w-[70px]"
                                              />
                                          )
                                      },
                                      {
                                          label: 'Color Levels',
                                          child: (
                                              <Input
                                                  onChange={(e) => {
                                                      setLevels(Number(e.target.value))
                                                  }}
                                                  value={levels()}
                                                  type="number"
                                                  min="2"
                                                  max="100"
                                                  class="w-[70px]"
                                              />
                                          )
                                      },
                                      {
                                          child: (
                                              <Button
                                                  onClick={(e) => {
                                                      setSettings({
                                                          zoom: zoom(),
                                                          quality: quality(),
                                                          levels: levels(),
                                                          grayScale: false
                                                      })
                                                  }}
                                                  class="w-full !justify-center !rounded-[var(--tab-item-border-radius)] !text-center"
                                                  title="Apply Settings"
                                              />
                                          )
                                      }
                                  ]
                        }
                    />
                )}
            </div>
            <div class="canvas-card">
                <canvas
                    ref={canvas}
                    class={isMobile ? `h-[203px] w-[360px]` : `h-[405px] w-[720px]`}
                    width={1920}
                    height={1080}
                />
            </div>
        </div>
    )
}

export default Map
