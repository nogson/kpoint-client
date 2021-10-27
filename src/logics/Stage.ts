import {PixiApp} from "@/logics/PixiApp";
import {Points} from "@/logics/Points";

export class Stage {
    readonly app: PixiApp
    readonly points: Points

    constructor(canvas: HTMLCanvasElement) {
        this.app = new PixiApp(canvas)
        this.points = new Points()
        this.app.addContainer(this.points.container)
        this.points.container.x = 0
    }
}
