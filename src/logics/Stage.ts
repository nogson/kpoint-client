import {PixiApp} from '@/logics/PixiApp'
import {Points} from '@/logics/Points'
import {Controller} from '@/logics/Controller'
import {AddPointDialog} from '@/logics/AddPointDialog'
import {ShopDialog} from '@/logics/ShopDialog'

const windowH = window.innerHeight

export class Stage {
    readonly app: PixiApp
    readonly points = new Points()
    readonly controller = new Controller()
    private addPointDialog: AddPointDialog | null = null
    private shopDialog: ShopDialog | null = null


    constructor(canvas: HTMLCanvasElement) {
        this.app = new PixiApp(canvas)
        this.app.addContainer(this.points.container)
        this.app.addContainer(this.controller.container)
        this.points.container.x = 0
        this.controller.container.y = windowH - 66 - 25
        this.controller.btnAddPoint.on('click', this.openAddPointDialog)
        this.controller.pointTextContainer.on('click', this.openShopDialog)
    }

    openAddPointDialog = () => {
        this.addPointDialog = new AddPointDialog(this.app,this.controller)
        this.app.addContainer(this.addPointDialog.container)
    }

    openShopDialog = () => {
        this.shopDialog = new ShopDialog(this.controller)
        this.app.addContainer(this.shopDialog.container)
    }
}
