import * as PIXI from 'pixi.js'
import btnAddPoint from '@/assets/images/btn_add_point.png'
import btnOpenShop from '@/assets/images/btn_open_shop.png'
import pointTextBox from '@/assets/images/point_text_box.png'

const windowW = document.body.clientWidth
const margin = 25

const pointTextStyle = new PIXI.TextStyle({
    fill: '0x000000',
    fontFamily: 'Helvetica',
    fontSize: 24,
    fontWeight: 'bold',
    align: 'right'
})

export class Controller {
    public btnAddPoint: PIXI.Sprite
    readonly btnOpenShop: PIXI.Sprite
    readonly pointTextBox: PIXI.Sprite
    readonly pointTextSprite: PIXI.Text | null
    readonly pointTextContainer = new PIXI.Container()
    public container: PIXI.Container = new PIXI.Container()

    constructor() {
        this.btnAddPoint = PIXI.Sprite.from(btnAddPoint)
        this.btnOpenShop = PIXI.Sprite.from(btnOpenShop)
        this.pointTextBox = PIXI.Sprite.from(pointTextBox)
        this.pointTextSprite = new PIXI.Text('10000', pointTextStyle)

        this.btnAddPoint.interactive = true
        this.btnAddPoint.buttonMode = true
        this.pointTextBox.y = 10
        this.pointTextContainer.addChild(this.pointTextBox)

        this.btnOpenShop.x = 130
        this.btnOpenShop.y = 0
        this.pointTextContainer.addChild(this.btnOpenShop)

        this.pointTextSprite.anchor.set(1, 0.5)
        this.pointTextSprite.x = 120
        this.pointTextSprite.y = 30
        this.pointTextContainer.addChild(this.pointTextSprite)


        this.pointTextContainer.x = windowW - 200 - margin
        this.pointTextContainer.y = 10
        this.container.addChild(this.pointTextContainer)

        this.container.addChild(this.btnAddPoint)
    }
}
