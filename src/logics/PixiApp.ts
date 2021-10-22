import * as PIXI from 'pixi.js';

const stageSize = {
    width: window.innerWidth,
    height: window.innerHeight
}

export class PixiApp extends PIXI.Application {
    constructor(canvas: HTMLCanvasElement) {
        super({
            backgroundColor: 0xcccccc,
            antialias: true,
            // resolution: window.devicePixelRatio || 1, // 解像度に合わせた拡大率を指定する
            resolution: 1,
            autoDensity: true, // CSSで見た目のサイズの戻してくれる,
            resizeTo: window,
            backgroundAlpha: 1,
            view: canvas
        });

        // スクロールできるようにする(不要かも)
        this.renderer.plugins.interaction.autoPreventDefault = false
        this.renderer.view.style.touchAction = 'auto'

        const world = new PIXI.Container()
        world.width = stageSize.width
        world.height = stageSize.height
        this.stage.addChild(world)
        // 背景
        const gradient = this.drawGradient(stageSize.width, stageSize.height, '#fffcd6', '#FFE600')
        const bgLayer = PIXI.Sprite.from(gradient)
        world.addChild(bgLayer)

        this.renderer.resize(window.innerWidth, window.innerHeight);

    }

    // グラデーション描画用のcanvasを作成
    private drawGradient(width: number, height: number, colorFrom: string, colorTo: string): HTMLCanvasElement {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, width, height)

            canvas.setAttribute('width', String(width))
            canvas.setAttribute('height', String(height))

            gradient.addColorStop(0, colorFrom)
            gradient.addColorStop(1, colorTo)

            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)
        }

        return canvas
    }

    public addContainer(container: any) {
        this.stage.addChild(container)
    }
}
