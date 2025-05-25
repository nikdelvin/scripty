export function getData(
    ctx: CanvasRenderingContext2D | null,
    source: HTMLImageElement | HTMLVideoElement,
    isVideo?: boolean,
) {
    const gradient = ' .:!/r(l1Z4H9W8$@'
    const width = isVideo
        ? (source as HTMLVideoElement).videoWidth
        : source.width
    const height = isVideo
        ? (source as HTMLVideoElement).videoHeight
        : source.height
    ctx?.drawImage(source, 0, 0, width, height)
    const imageData = ctx?.getImageData(0, 0, width, height)
    const lettersData = []
    for (let x = 0, len = imageData?.data.length as number; x < len; x += 4) {
        const r = imageData?.data[x] as number
        const g = imageData?.data[x + 1] as number
        const b = imageData?.data[x + 2] as number
        const avg = Math.floor((r + g + b) / 3)
        if (avg === 255) lettersData.push(gradient[16])
        else lettersData.push(gradient[Math.floor(avg / 15)])
    }
    const output = []
    const chunkSize = width
    for (let i = 0; i < lettersData.length; i += chunkSize) {
        const chunk = lettersData.slice(i, i + chunkSize)
        output.push(`${chunk.join('')}\n`)
    }
    return {
        values: output.join(''),
        width,
        height,
    }
}

export function updateDataFromImage(
    imageSrc: string,
    callback: (data: { values: string; width: number; height: number }) => void,
) {
    new Promise((resolve) => {
        const image = new Image()
        image.src = imageSrc
        image.addEventListener('load', () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.width
            canvas.height = image.height
            const ctx = canvas.getContext('2d')
            resolve(getData(ctx, image))
        })
    }).then((data) => {
        callback(
            data as {
                values: string
                width: number
                height: number
            },
        )
    })
}

export function updateDataFromVideo(
    videoSrc: string,
    callback: (data: {
        values: string
        width: number
        height: number
    }) => boolean,
) {
    const video = document.createElement('video')
    video.src = videoSrc
    video.autoplay = true
    video.muted = true
    video.playsInline = true
    video.loop = true
    video.crossOrigin = 'https://www.mediafire.com'
    video.addEventListener('loadeddata', function () {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        function update() {
            const check = callback(getData(ctx, video, true))
            if (check) requestAnimationFrame(update)
            else video.remove()
        }
        video.play()
        update()
    })
}

export async function updateDataFrom2DSpace(
    space: {
        width: number
        height: number
        objectsRender: (tick: number, isMobile: boolean) => string[][]
        isMobile: boolean
    },
    callback: (data: {
        values: string
        width: number
        height: number
    }) => boolean,
) {
    for (let t = 0; t < 10000; t++) {
        await new Promise((resolve) => setTimeout(resolve, 16.67))
        const objects = space.objectsRender(t, space.isMobile)
        const output: string[][] = new Array(space.height)
            .fill(true)
            .map(() => new Array(space.width).fill(' '))
        for (const coord of [...new Set(objects.flat())]) {
            const x = Number(coord.split(';')[0]) + Math.floor(space.width / 2)
            const y = Number(coord.split(';')[1]) + Math.floor(space.height / 2)
            try {
                output[y][x] = '@'
            } catch {}
        }
        const chunks = []
        for (const chunk of output) {
            chunks.push(chunk.join(''))
        }
        const check = callback({
            values: chunks.reverse().join('\n'),
            width: space.width,
            height: space.height,
        })
        if (!check) {
            console.log('change source')
            break
        }
    }
}

export class Vec2D {
    x: number
    y: number
    len: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.len = Math.sqrt(x * x + y * y)
    }

    public '+'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x + vector.x, this.y + vector.y)
    }

    public '-'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x - vector.x, this.y - vector.y)
    }

    public '*'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x * vector.x, this.y * vector.y)
    }

    public '/'(vector: Vec2D): Vec2D {
        return new Vec2D(this.x / vector.x, this.y / vector.y)
    }

    public '==='(vector: Vec2D): boolean {
        return this.x === vector.x && this.y === vector.y
    }

    public '=='(vector: Vec2D): boolean {
        return this.len === vector.len
    }

    public '<'(vector: Vec2D): boolean {
        return this.len < vector.len
    }

    public '>'(vector: Vec2D): boolean {
        return this.len > vector.len
    }

    public line(vector: Vec2D): string[] {
        const dots = []
        for (let t = 0; t < 1; t += 0.0001) {
            dots.push(
                `${Math.floor(this.x + (vector.x - this.x) * t)};${Math.floor(
                    this.y + (vector.y - this.y) * t,
                )}`,
            )
        }
        return [...new Set(dots)]
    }

    public lineLength(vector: Vec2D): number {
        return Math.floor(
            Math.sqrt(
                Math.pow(Math.abs(this.x - vector.x), 2) +
                    Math.pow(Math.abs(this.y - vector.y), 2),
            ),
        )
    }

    public circle(radius: number): string[] {
        const dots = []
        for (let t = 0; t < 2 * Math.PI; t += 0.0001) {
            dots.push(
                `${Math.floor(this.x + radius * Math.cos(t))};${Math.floor(
                    this.y + radius * Math.sin(t),
                )}`,
            )
        }
        return [...new Set(dots)]
    }

    public rotateCircle(
        objects: Vec2D[],
        clockSide: boolean,
        tick: number,
        speed: number,
    ): Vec2D[] {
        const newObjects = []
        for (const object of objects) {
            const angle = Math.acos(
                (this.x - object.x) / this.lineLength(object),
            )
            newObjects.push(
                new Vec2D(
                    this.x +
                        Math.floor(
                            this.lineLength(object) *
                                Math.cos(angle + tick / speed),
                        ) *
                            (clockSide ? -1 : 1),
                    this.y +
                        Math.floor(
                            this.lineLength(object) *
                                Math.sin(angle + tick / speed),
                        ),
                ),
            )
        }
        return newObjects
    }
}

export const objectsRender = (tick: number, isMobile: boolean) => {
    const sunCentre = new Vec2D(0, 0)
    const planets = {
        mercuryCentre: new Vec2D((45 + 4)/(isMobile ? 2 : 1), 0),
        venusCentre: new Vec2D((45 + 8)/(isMobile ? 2 : 1), 0),
        earthCentre: new Vec2D((45 + 11)/(isMobile ? 2 : 1), 0),
        marsCentre: new Vec2D((45 + 17)/(isMobile ? 2 : 1), 0),
        jupiterCentre: new Vec2D((45 + 57)/(isMobile ? 2 : 1), 0),
        saturnCentre: new Vec2D((45 + 105)/(isMobile ? 2 : 1), 0),
        uranusCentre: new Vec2D((45 + 211)/(isMobile ? 2 : 1), 0),
        neptuneCentre: new Vec2D((45 + 300)/(isMobile ? 2 : 1), 0)
    }
    const speedMultiply = [0.24, 0.61, 1, 1.88, 11.86, 29.46, 84.01, 164.79]
    for (const [index, planet] of Array.from(
        Object.keys(planets).entries(),
    )) {
        ;(planets as Record<string, Vec2D>)[planet] =
            sunCentre.rotateCircle(
                [(planets as Record<string, Vec2D>)[planet]],
                true,
                tick,
                speedMultiply[index] * 10,
            )[0]
    }
    return [
        sunCentre.circle(45/(isMobile ? 2 : 1)),
        planets.mercuryCentre.circle(0.38/(isMobile ? 2 : 1)),
        planets.venusCentre.circle(0.94/(isMobile ? 2 : 1)),
        planets.earthCentre.circle(1/(isMobile ? 2 : 1)),
        planets.marsCentre.circle(0.53/(isMobile ? 2 : 1)),
        planets.jupiterCentre.circle(11.21/(isMobile ? 2 : 1)),
        planets.saturnCentre.circle(9.41/(isMobile ? 2 : 1)),
        planets.uranusCentre.circle(3.98/(isMobile ? 2 : 1)),
        planets.neptuneCentre.circle(3.81/(isMobile ? 2 : 1)),
    ]
}