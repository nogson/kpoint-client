import * as PIXI from 'pixi.js'
import dialogBg from '@/assets/images/shop_dialog_bg.png'
import closeButton from '@/assets/images/button_close.png'
import productThumbnail from '@/assets/images/product_thumbnail.png'
import iconPoint from '@/assets/images/icon_point.png'
import {Controller} from '@/logics/Controller'
import {gsap} from 'gsap'
import store from '@/store'
import {present} from '@/types/present'

const windowW = window.innerWidth
const windowH = window.innerHeight

const productTextStyle = new PIXI.TextStyle({
    fill: '0x000000',
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
    breakWords: true,
    wordWrap: true,
    wordWrapWidth: 200
})

const pointTextStyle = new PIXI.TextStyle({
    fill: '0x000000',
    fontSize: 22,
    fontWeight: 'bold'
})

export class ShopDialog {
    public container = new PIXI.Container()
    private background = new PIXI.Graphics()
    private dialogContainer = new PIXI.Container()
    private dialogBg = PIXI.Sprite.from(dialogBg)
    public closeButton = PIXI.Sprite.from(closeButton)
    private controller: Controller

    constructor(controller: Controller) {
        this.container.sortableChildren = true
        this.controller = controller
        this.dialogContainer.y = windowH

        // //背景を作成
        this.createBackGround()
        // ダイアログを作成
        this.createDialog()
        // 閉じるボタン
        this.closeButton.x = windowW - 65
        this.closeButton.alpha = 0
        this.closeButton.interactive = true
        this.closeButton.buttonMode = true
        this.closeButton.on('click', () => {
            this.fadeOut()
        })
        this.closeButton.emit('fadeOutShopDialog')
        this.container.addChild(this.closeButton)

        this.fadeIn()
    }

    private fadeIn() {
        this.controller.container.interactiveChildren = false
        gsap.to(this.closeButton, {alpha: 1, duration: 1})
        gsap.to(this.background, {alpha: 1, duration: 1})
        gsap.to(this.dialogContainer, {y: (windowH - 700) / 2, duration: 0.5, ease: 'back.out'})
    }

    private fadeOut() {
        this.controller.container.interactiveChildren = true
        gsap.to(this.closeButton, {alpha: 0, duration: 1})
        gsap.to(this.background, {alpha: 0, duration: 1})
        gsap.to(this.dialogContainer, {y: windowH, duration: 0.5, ease: 'back.in'})
    }


    private createDialog = () => {
        const itemWidth = 350
        const itemHeight = 120
        const items = store.getters.presents

        // 背景
        this.dialogBg.anchor.set(0.5, 0)
        this.dialogBg.x = windowW / 2
        this.dialogContainer.addChild(this.dialogBg)


        items.forEach((item: present, i: number) => {
            const itemContainer = new PIXI.Container()
            const thumbnail = PIXI.Sprite.from(productThumbnail)

            itemContainer.x = (windowW - itemWidth) / 2
            itemContainer.y = i * (itemHeight + 24) + 130

            // 背景
            const itemBg = new PIXI.Graphics()
            itemBg.interactive = true
            itemBg.buttonMode = true

            itemBg.beginFill(0xffffff)
            itemBg.drawRoundedRect(0, 0, itemWidth, itemHeight, 20)
            itemBg.endFill()

            itemBg.on('click', () => {
                console.log('ok')
            })

            //itemBg.anchor.set(0.5, 0)
            itemBg.x = 0
            itemBg.y = 0
            itemContainer.addChild(itemBg)

            // 商品の写真
            thumbnail.x = 20
            thumbnail.y = 10
            itemContainer.addChild(thumbnail)


            // テキスト
            const productText = item.name
            const productTextSprite = new PIXI.Text(productText, productTextStyle)
            productTextSprite.x = 100 + 40
            productTextSprite.y = 20
            itemContainer.addChild(productTextSprite)

            // ポイントアイコン
            const icon = PIXI.Sprite.from(iconPoint)
            icon.x = 100 + 40
            icon.y = 70
            itemContainer.addChild(icon)

            // ポイントテキスト
            const pointText = String(item.point)
            const pointTextSprite = new PIXI.Text(pointText, pointTextStyle)
            pointTextSprite.x = 185
            pointTextSprite.y = 75
            itemContainer.addChild(pointTextSprite)

            this.dialogContainer.addChild(itemContainer)
        })


        this.container.addChild(this.dialogContainer)
    }
    //
    // private getPoint = (point: number) => {
    //     console.log('ok', point)
    // }
    //
    private createBackGround = () => {
        this.background.beginFill(0x00C2FF)
        this.background.drawRect(0, 0, windowW, windowH)
        this.background.endFill()
        this.background.alpha = 0
        this.container.addChild(this.background)
    }
}
