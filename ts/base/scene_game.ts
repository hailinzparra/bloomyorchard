const scene_game = new CoreScene()

const scene_game_props = {
    spawn_interval: 400,
    spawn_counter: 0,
    bomb_prob: 0.2,
}

scene_game.start = () => {
    scene_game_props.spawn_counter = 0
}

scene_game.update = () => {
    // Spawn logic
    scene_game_props.spawn_counter += time.dt
    if (scene_game_props.spawn_counter > scene_game_props.spawn_interval) {
        let n: Apple | Bomb
        if (Math.random() > scene_game_props.bomb_prob) {
            n = obj.instantiate('apple', new Apple(stage.get_random_x(), stage.h))
        }
        else {
            n = obj.instantiate('bomb', new Bomb(stage.get_random_x(), stage.h))
        }
        const xdif = n.x - stage.mid.w
        const x_knock_off = ((stage.mid.w - Math.abs(xdif)) / stage.mid.w)
        n.vx = xdif * (0.2 + 0.8 * x_knock_off) * -0.05
        n.vy = -(22 + 5 * Math.random())

        scene_game_props.spawn_counter = 0
    }
    // Slice logic
    if (input.mouse_hold(0)) {
        const sliceables = obj.take('apple', 'bomb') as (Apple | Bomb)[]
        for (const n of sliceables) {
            const distance_to_mouse = Math.hypot(n.x - input.mouse_x, n.y - input.mouse_y)
            if (distance_to_mouse < n.hit_range * n.xs) {
                n.slice()
            }
        }
    }
}

scene_game.render = () => {
}
