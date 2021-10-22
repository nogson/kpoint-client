import * as PIXI from 'pixi.js'
import {PixiApp} from '@/logics/PixiApp'
import active from '@/assets/images/point_active.png'

export class Point {
    private activePoint = PIXI.Sprite.from(active)

    constructor(app:PixiApp) {
        app.addContainer(this.activePoint)
    }
}
