const scene_game = new CoreScene()

const scene_game_props = {
    score: 0,
    best_score: 0,
    spawn_interval: 400,
    spawn_counter: 0,
    bomb_prob: 0.2,
    fruitbox: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'fruitbox')),
    fruit_coin: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'fruit_coin')),
    bomb_ui_box: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'bomb_ui_box')),
}

scene_game.start = () => {
    scene_game_props.score = 0
    // scene_game_props.best_score = 0 // retrieve from database
    scene_game_props.spawn_counter = 0

    scene_game_props.fruitbox.set_target_position(stage.mid.w - 40, stage.h - 5, true)
    scene_game_props.fruitbox.y += 180

    scene_game_props.fruit_coin.set_target_position(42, 38, true)
    scene_game_props.fruit_coin.x = -80
    scene_game_props.fruit_coin.y = -80
    scene_game_props.fruit_coin.lerp_speed = 0.1

    scene_game_props.bomb_ui_box.set_target_position(stage.w - 48, 21, true)
    scene_game_props.bomb_ui_box.x += 100
    scene_game_props.bomb_ui_box.y -= 100
    scene_game_props.bomb_ui_box.lerp_speed = 0.1
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
                scene_game_props.score += n.score
            }
        }
    }
}

scene_game.render = () => {
}

scene_game.render_ui = () => {
    obj.take('scene_game_ui').forEach(n => n.render())

    draw.set_font(font.l)
    draw.set_hvalign('left', 'middle')
    draw.text(90, 40, `${scene_game_props.score}`)

    draw.set_font(font.m)
    draw.set_hvalign('left', 'top')
    draw.text(20, 80, `Best: ${scene_game_props.best_score}`)
}
