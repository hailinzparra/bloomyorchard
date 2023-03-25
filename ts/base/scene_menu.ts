const scene_menu = new CoreScene()

scene_menu.start = () => {
    console.log('start menu')
}

scene_menu.update = () => {
    if (input.mouse_down(0)) {
        const n = obj.instantiate('apple', new Apple(stage.get_random_x(), stage.h))
        const xdif = n.x - stage.mid.w
        const x_knock_off = ((stage.mid.w - Math.abs(xdif)) / stage.mid.w)
        n.vx = xdif * (0.2 + 0.8 * x_knock_off) * -0.05
        n.vy = -(22 + 5 * Math.random())
    }

    if (input.mouse_hold(0)) {
        const apples = obj.take('apple') as Apple[]
        for (const apple of apples) {
            const distance_to_mouse = Math.hypot(apple.x - input.mouse_x, apple.y - input.mouse_y)
            if (distance_to_mouse < apple.hit_range * apple.xs) {
                apple.slice()
            }
        }
    }
}

scene_menu.render = () => {
}
