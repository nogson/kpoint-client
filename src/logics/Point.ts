import * as PIXI from 'pixi.js'
import active from '@/assets/images/point_active.png'
import deActive from '@/assets/images/point_deactive.png'

export class Point {
    readonly pointSprite: PIXI.Sprite | null
    readonly text: PIXI.Text | null
    public container: PIXI.Container = new PIXI.Container()

    constructor(isActive = false, text = '1', x = 0, y = 0) {

        this.pointSprite = isActive ? PIXI.Sprite.from(active) : PIXI.Sprite.from(deActive)
        this.container.addChild(this.pointSprite)

        const style = new PIXI.TextStyle({
            fill: "white",
            fontFamily: "Helvetica",
            fontSize: 50,
            fontWeight: "bold",
            dropShadow: true,
            dropShadowColor: "#b2b2b2",
            dropShadowDistance: -2,
            dropShadowAngle: 0.5,
            dropShadowBlur: 1,
        });

        this.text = new PIXI.Text(text, style);

        this.text.x = 40
        this.text.y = 25

        this.container.addChild(this.text)

        this.container.x = x
        this.container.y = y
    }
    
}
