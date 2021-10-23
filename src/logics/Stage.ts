import {PixiApp} from "@/logics/PixiApp";
import {Point} from "@/logics/Point";

export class Stage {
    readonly app: PixiApp
    readonly point: Point

    constructor(canvas: HTMLCanvasElement) {
        this.app = new PixiApp(canvas)
        this.point = new Point(true, '5')
        this.app.addContainer(this.point.container)
        this.point.container.x = 100
    }
}
