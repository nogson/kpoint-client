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
    readonly textSprite: PIXI.Text | null
    public container: PIXI.Container = new PIXI.Container()
    public pointSprite: PIXI.Sprite | null

    constructor(props: props = {text: '0', x: 0, y: 0, isActive: false}) {

        this.pointSprite = props.isActive ? PIXI.Sprite.from(active) : PIXI.Sprite.from(deActive)
        console.log(this.pointSprite)
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
        })

        this.textSprite = new PIXI.Text(props.text, style)

        this.textSprite.x = props.text.length >= 2 ? 22 : 36
        this.textSprite.y = 20

        this.container.addChild(this.textSprite)

        this.container.x = props.x
        this.container.y = props.y
    }

    public setActive = (b:boolean) => {
        if(this.pointSprite) {
           // this.pointSprite.texture = b? PIXI.Sprite.from(active) : PIXI.Sprite.from(deActive)
        }
    }

}
