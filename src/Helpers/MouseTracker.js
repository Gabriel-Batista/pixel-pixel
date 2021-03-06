import { store } from '../index.js'

export const getMousePosition = (e) => {
    let rect = store.getState().canvas.canvasRef.current.getBoundingClientRect();
    return {
        x: (e.clientX - rect.left).roundTo(store.getState().canvas.pixelSize),
        y: (e.clientY - rect.top).roundTo(store.getState().canvas.pixelSize)
    }
}

