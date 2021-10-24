import * as PIXI from 'pixi.js'
import active from '@/assets/images/point_active.png'
import deActive from '@/assets/images/point_deactive.png'

type props = {
    text: string,
    x: number,
    y: number,
    isActive: boolean
}


export class Point {
    readonly pointSprite: PIXI.Sprite | null
    readonly textSprite: PIXI.Text | null
    public container: PIXI.Container = new PIXI.Container()
    readonly width = 111
    readonly height = 111

    constructor(props: props = {text: '0', x: 0, y: 0, isActive: false}) {

        this.pointSprite = props.isActive ? PIXI.Sprite.from(active) : PIXI.Sprite.from(deActive)
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

        this.textSprite = new PIXI.Text(props.text, style);

        this.textSprite.x = 40
        this.textSprite.y = 25

        this.container.addChild(this.textSprite)

        this.container.x = props.x
        this.container.y = props.y
    }

}
