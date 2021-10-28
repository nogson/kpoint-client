import * as PIXI from 'pixi.js'
import {Point} from '@/logics/Point'

const windowW = window.innerWidth

export class Points {
    public container: PIXI.Container = new PIXI.Container()

    constructor(maxPoints = 100) {
        const positions = this.getPosition(maxPoints)

        for (let i = 0, j = positions.length; i < j; i++) {
            const props = {
                text: String(i + 1),
                x: positions[i].x,
                y: positions[i].y,
                isActive: true
            }
            const point = new Point(props)
            this.container.addChild(point.container)
        }
    }

    private getPosition = (maxPoints: number): { x: number, y: number }[] => {
        const margin = 25
        const pointSize = 100 + margin
        const positions: { x: number, y: number }[] = []
        const maxLength = Math.floor((windowW - pointSize) / pointSize)
        let direction = 1
        let x = (windowW - ((maxLength + 1) * pointSize - margin)) /2
        let y = margin
        for (let i = 0; i < maxPoints; i++) {

            if (i !== 0) {
                direction = Math.floor(i / (maxLength + 2)) % 2 === 0 ? 1 : -1
                if (i % (maxLength + 2) === maxLength + 1) {
                    y = positions[i - 1].y + pointSize
                    x = positions[i - 1].x
                } else if (i % (maxLength + 2) === 0) {
                    y = positions[i - 1].y + pointSize
                    x = positions[i - 1].x
                } else {
                    y = positions[i - 1].y
                    x = positions[i - 1].x + pointSize * direction
                }
            }

            positions.push({x, y})
        }


        return positions
    }

}
