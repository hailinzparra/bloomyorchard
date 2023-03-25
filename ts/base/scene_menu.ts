const scene_menu = new CoreScene()

scene_menu.start = () => {
    console.log('start menu')
}

scene_menu.update = () => {
    if (input.mouse_down(0)) {
        const n = obj.instantiate('apple', new Apple(stage.get_random_x(), stage.h))
        console.log(n.x, n.y)
        const xdif = n.x - stage.mid.w
        const x_knock_off = ((stage.mid.w - Math.abs(xdif)) / stage.mid.w)
        n.vx = xdif * (0.2 + 0.8 * x_knock_off) * -0.05
        n.vy = -(22 + 5 * Math.random())
        console.log('apple')
    }
}

scene_menu.render = () => {
}
