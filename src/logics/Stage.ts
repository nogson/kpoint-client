import {PixiApp} from "@/logics/PixiApp";
import {Point} from "@/logics/Point";

export class Stage {
    readonly app: PixiApp
    readonly point: Point

    constructor(canvas: HTMLCanvasElement) {
        this.app = new PixiApp(canvas)
        this.point = new Point(this.app)
    }
}
