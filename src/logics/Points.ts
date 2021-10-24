import * as PIXI from 'pixi.js'
import {Point} from '@/logics/Point'

export class Points {
    public container: PIXI.Container = new PIXI.Container()

    constructor(maxPoints = 10) {
        for (let i = 0; i < maxPoints; i++) {
            const point = new Point(true, String(i),i * 10, i * 10)
            this.container.addChild(point.container)
            console.log(point.container.width)
        }
    }
}
