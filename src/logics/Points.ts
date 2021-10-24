import * as PIXI from 'pixi.js'
import {Point} from '@/logics/Point'

export class Points {
    public container: PIXI.Container = new PIXI.Container()

    constructor(maxPoints = 10) {
        for (let i = 0; i < maxPoints; i++) {
            const props = {
                text: String(i),
                x: i * 10,
                y: i * 10,
                isActive: true
            }
            const point = new Point(props)
            this.container.addChild(point.container)
            console.log(point.height)
        }
    }
}
