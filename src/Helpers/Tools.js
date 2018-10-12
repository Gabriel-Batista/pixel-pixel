import { store } from '../index.js'


const draw= (position) => {
    console.log("x:", position.x.roundTo(store.getState().canvas.pixelSize))
    console.log("y:", position.y.roundTo(store.getState().canvas.pixelSize))
    store.getState().history.pushHistory({ x: position.x.roundTo(store.getState().canvas.pixelSize), y: position.y.roundTo(this.props.pixelSize) })
    store.getState().canvas.context.fillRect(position.x.roundTo(store.getState().canvas.pixelSize), position.y.roundTo(this.props.pixelSize), this.props.pixelSize, this.props.pixelSize)
}

const eraser= () =>   {

}

export const getTool= () => {
    switch(store.getState().tools.currentTool)  {
        case 'eraser':
            return eraser
        case 'draw':
        return draw
        default:
            console.log("There is no tool named", store.getState().tools.currentTool)
    }
}