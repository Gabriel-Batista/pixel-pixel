import { store } from '../index.js'

export const getMousePosition = (e) => {
    console.log("here", store.getState())
    let rect = store.getState().canvas.canvasRef.current.getBoundingClientRect();
    return {
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top)
    }
}

