import * as PIXI from 'pixi.js'
import {Point} from '@/logics/Point'
import store from '@/store'
import {watch} from "vue"

const windowW = document.body.clientWidth

interface Position {
    x: number
    y: number
}

export class Points {
    public container = new PIXI.Container()
    private pointSize = 100
    private positions:Position[] = []
    private pointInstance:any[] = []

    constructor(maxPoints = 30) {
        this.positions = this.getPosition(maxPoints)

        // line
        for (let i = 0, j = this.positions.length - 1; i < j; i++) {
            const line = new PIXI.Graphics()
            const margin: number = this.pointSize / 2
            const startX: number = this.positions[i].x + margin
            const startY: number = this.positions[i].y + margin
            const endX: number = this.positions[i + 1].x + margin
            const endY: number = this.positions[i + 1].y + margin
            line.lineStyle(22, 0xF9C200).moveTo(startX, startY).lineTo(endX, endY)
            this.container.addChild(line)
        }

        for (let i = 0, j = this.positions.length; i < j; i++) {
            const props = {
                text: String(i + 1),
                x: this.positions[i].x,
                y: this.positions[i].y,
                isActive: store.getters.userSate.point > i + 1
            }
            const point = new Point(props)
            this.pointInstance.push(point)
            this.container.addChild(point.container)
        }

        watch(
            () => store.state.userSate.point,
            async (v,ov) => {
                console.log(v,ov,this.pointInstance)
                this.pointInstance[24].setActive(true)
                // this.setActive
            }
        )
    }

    private updatePointStatus = () => {
        // point

    }

    private getPosition = (maxPoints: number): Position[] => {
        const margin = 25
        const pointSize = this.pointSize + margin
        const positions: { x: number, y: number }[] = []
        const maxLength = Math.floor((windowW - pointSize) / pointSize)
        let direction = 1
        let x = (windowW - ((maxLength + 1) * pointSize - margin)) / 2
        let y = margin
        for (let i = 0; i < maxPoints; i++) {

            if (i !== 0) {
                direction = Math.floor(i / (maxLength + 2)) % 2 === 0 ? 1 : -1
                if (i % (maxLength + 2) === maxLength + 1) {
                    y = positions[i - 1].y + pointSize
                    x = positions[i - 1].x
                } else if (i % (maxLength + 2) === 0) {
                    y = positions[i - 1].y + pointSize
                    x = positions[i - 1].x
                } else {
                    y = positions[i - 1].y
                    x = positions[i - 1].x + pointSize * direction
                }
            }

            positions.push({x, y})
        }


        return positions
    }

}
