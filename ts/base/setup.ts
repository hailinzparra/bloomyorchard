core.setup('Bloomy Orchard', document.body, window)

const loop = () => {
    if (core.input.is_mouse_moving) {
        console.log('is moving...')
    }
    if (core.input.mouse_down(0)) {
        console.log('left clicked')
    }
    if (core.input.mouse_hold(0)) {
        console.log('left held')
    }
    if (core.input.mouse_up(0)) {
        console.log('left released')
    }
    core.input.reset()
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
