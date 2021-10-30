import * as PIXI from 'pixi.js'
import {PixiApp} from '@/logics/PixiApp'

const windowW = document.body.clientWidth
const windowH = window.innerHeight

export class AddPointDialog {
    public container = new PIXI.Container()
    public backGroundContainer = new PIXI.Container()
    private background = new PIXI.Graphics()

    constructor(app: PixiApp) {
        this.background.beginFill(0xffffff)
        this.background.drawRect(0, 0, windowW, windowH)
        this.container.addChild(this.background)
        this.container.addChild(this.backGroundContainer)
        this.createBackGround()

        app.ticker.add(() => {
            this.backGroundContainer.children.forEach(child => {
                child.rotation += 0.01
            })
        })
    }

    createBackGround = () => {
        for (let i = 0, j = 21; i < j; i++) {
            const line = new PIXI.Graphics()
            line.beginFill(0x01C2FF)
            line.moveTo(0, 0)
            line.lineTo(-60, windowH * -1)
            line.lineTo(60, windowH * -1)
            line.lineTo(0, 0)
            line.closePath()
            line.endFill()
            line.x = windowW / 2
            line.y = windowH / 2
            line.rotation = i * 0.3
            this.backGroundContainer.addChild(line)
        }
    }
}
