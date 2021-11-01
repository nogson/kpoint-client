import {PixiApp} from '@/logics/PixiApp'
import {Points} from '@/logics/Points'
import {Controller} from '@/logics/Controller'
import {AddPointDialog} from '@/logics/AddPointDialog'

const windowH = window.innerHeight

export class Stage {
    readonly app: PixiApp
    readonly points = new Points()
    readonly controller = new Controller()
    readonly addPointDialog :AddPointDialog

    constructor(canvas: HTMLCanvasElement) {
        this.app = new PixiApp(canvas)
        this.addPointDialog = new AddPointDialog(this.app)
        this.app.addContainer(this.points.container)
        this.app.addContainer(this.controller.container)
        this.points.container.x = 0
        this.controller.container.y = windowH - 66 - 25

        this.controller.btnAddPoint.on('click', this.openAddPointWindow)

    }

    openAddPointWindow = () => {
        this.app.addContainer(this.addPointDialog.container)
    }
}
