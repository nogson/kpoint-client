import * as PIXI from 'pixi.js'
import {PixiApp} from '@/logics/PixiApp'
import dialogBg from '@/assets/images/point_dialog_bg.png'
import dialogTextBoxBg from '@/assets/images/point_dialog_text_box.png'
import closeButton from '@/assets/images/button_close.png'
import {gsap} from 'gsap'
import {Controller} from '@/logics/Controller'

const windowW = window.innerWidth
const windowH = window.innerHeight

const pointTextStyle = new PIXI.TextStyle({
    fill: 'white',
    fontFamily: 'Helvetica',
    fontSize: 50,
    fontWeight: 'bold',
    dropShadow: true,
    dropShadowColor: '#b2b2b2',
    dropShadowDistance: -2,
    dropShadowAngle: 0.5,
    dropShadowBlur: 1,
})

const pointDetailTextStyle = new PIXI.TextStyle({
    fill: '0x000000',
    fontFamily: 'Helvetica',
    fontSize: 20,
    fontWeight: 'bold',
})

export class AddPointDialog {
    public container = new PIXI.Container()
    public backGroundContainer = new PIXI.Container()
    private background = new PIXI.Graphics()
    private dialogContainer = new PIXI.Container()
    private dialogBg = PIXI.Sprite.from(dialogBg)
    private dialogTextBoxArr: PIXI.Container[] = []
    private closeButton = PIXI.Sprite.from(closeButton)
    private controller: Controller

    constructor(app: PixiApp, controller: Controller) {
        this.container.sortableChildren = true
        this.controller = controller
        //背景を作成
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
        this.container.addChild(this.closeButton)
        //背景のアニメーション
        this.dialogContainer.y = windowH
        app.ticker.add(() => {
            this.rotationBackground()
        })

        this.fadeIn()
    }

    private rotationBackground = () => {
        this.backGroundContainer.children.forEach(child => {
            child.rotation += 0.01
        })
    }

    private fadeIn() {
        this.controller.container.interactiveChildren = false
        gsap.to(this.closeButton, {alpha: 1, duration: 1})
        gsap.to(this.background, {alpha: 1, duration: 1})
        gsap.to(this.dialogContainer, {y: (windowH - 700) / 2, duration: 0.5, ease: 'back.out'})
        this.backGroundContainer.children.forEach(child => {
            gsap.to(child, {alpha: 1, duration: 1})
        })
    }

    private fadeOut() {
        this.controller.container.interactiveChildren = true
        gsap.to(this.closeButton, {alpha: 0, duration: 1})
        gsap.to(this.background, {alpha: 0, duration: 1})
        gsap.to(this.dialogContainer, {y: windowH, duration: 0.5, ease: 'back.in'})
        this.backGroundContainer.children.forEach(child => {
            gsap.to(child, {alpha: 0, duration: 0.5})
        })
    }

    private createDialog = () => {
        // 背景
        this.dialogBg.anchor.set(0.5, 0)
        this.dialogBg.x = windowW / 2
        this.dialogContainer.addChild(this.dialogBg)

        // ポイントのテキストボックス
        for (let i = 0, j = 4; i < 4; i++) {
            const textBoxContainer = new PIXI.Container()
            const dialogTextBox = PIXI.Sprite.from(dialogTextBoxBg)
            // 背景
            dialogTextBox.anchor.set(0.5, 0)
            dialogTextBox.x = windowW / 2
            dialogTextBox.y = i * (133 + 24) + 110
            textBoxContainer.addChild(dialogTextBox)
            // ポイント テキスト
            const point = i
            const pointTextSprite = new PIXI.Text(String(point), pointTextStyle)
            pointTextSprite.anchor.set(0.5)
            pointTextSprite.x = windowW / 2 - 102
            pointTextSprite.y = i * (133 + 24) + 110 + 133 / 2
            textBoxContainer.addChild(pointTextSprite)

            // 特典内容 テキスト
            const detailTextSprite = new PIXI.Text('宿題頑張りました！', pointDetailTextStyle)
            detailTextSprite.anchor.set(0, 0.5)
            detailTextSprite.x = windowW / 2 - 40
            detailTextSprite.y = i * (133 + 24) + 110 + 133 / 2
            textBoxContainer.addChild(detailTextSprite)

            this.dialogContainer.addChild(textBoxContainer)
            this.dialogTextBoxArr.push(textBoxContainer)

            textBoxContainer.interactive = true
            textBoxContainer.buttonMode = true
            textBoxContainer.on('click', () => {
                this.getPoint(point)
            })

        }
        this.container.addChild(this.dialogContainer)
    }

    private getPoint = (point: number) => {
        console.log('ok', point)
    }

    private createBackGround = () => {
        this.background.beginFill(0xffffff)
        this.background.drawRect(0, 0, windowW, windowH)
        this.background.alpha = 0
        this.container.addChild(this.background)
        this.container.addChild(this.backGroundContainer)

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
            line.alpha = 0
            this.backGroundContainer.addChild(line)
        }
    }
}
