const scene_game = new CoreScene()
scene_game.is_obj_render_disabled = true

const view_game = CoreView.instantiate_view()

type SceneGamePropsState = 'play' | 'gameover'

const scene_game_props = {
    state: 'play' as SceneGamePropsState,
    score: 0,
    best_score: 0,
    lives: 0,
    starting_lives: 3,
    spawn_interval: 400,
    spawn_counter: 0,
    bomb_prob: 0,
    starting_bomb_prob: 0.05,
    max_bomb_prob: 0.5,
    fruitbox: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'fruitbox')),
    fruit_coin: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'fruit_coin')),
    bomb_ui_box: obj.instantiate('scene_game_ui', new SceneGameUI(0, 0, 'bomb_ui_box')),
    fruit_spawn_list: ['apple', 'orange', 'pear', 'banana'],
    spawn_random_fruit() {
        const name = this.fruit_spawn_list[Math.floor(Math.random() * this.fruit_spawn_list.length)]
        switch (name) {
            case 'orange':
                return obj.instantiate('orange', new Orange(stage.get_random_x(), stage.h))
            case 'pear':
                return obj.instantiate('pear', new Pear(stage.get_random_x(), stage.h))
            case 'banana':
                return obj.instantiate('banana', new Banana(stage.get_random_x(), stage.h))
        }
        return obj.instantiate('apple', new Apple(stage.get_random_x(), stage.h))
    },
    change_state(new_state: SceneGamePropsState) {
        this.state = new_state
    },
    add_score(amount: number) {
        this.score += amount
        const bomb_prob_dif = this.max_bomb_prob - this.starting_bomb_prob
        let bomb_prop_multiplier = 0
        if (this.score > 800) {
            bomb_prop_multiplier = 0.2 + 0.8 * ((this.score - 800) / 1000)
        }
        else if (this.score > 300) {
            bomb_prop_multiplier = 0.2
        }
        this.bomb_prob = Math.min(bomb_prop_multiplier, 1) * bomb_prob_dif + this.starting_bomb_prob
    },
    remove_lives(amount: number) {
        this.lives -= amount
        if (this.lives <= 0) {
            this.lives = 0
            this.change_state('gameover')
        }
    },
}

scene_game.start = () => {
    scene_game_props.state = 'play'
    scene_game_props.score = 0
    // scene_game_props.best_score = 0 // retrieve from database
    scene_game_props.lives = scene_game_props.starting_lives
    scene_game_props.spawn_counter = 0
    scene_game_props.bomb_prob = scene_game_props.starting_bomb_prob

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
    if (scene_game_props.state === 'play') {
        scene_game_props.spawn_counter += time.dt
        if (scene_game_props.spawn_counter > scene_game_props.spawn_interval) {
            const fruits_to_spawn: Fruit[] = []
            fruits_to_spawn.push(scene_game_props.spawn_random_fruit())
            if (Math.random() <= scene_game_props.bomb_prob) {
                fruits_to_spawn.push(obj.instantiate('bomb', new Bomb(stage.get_random_x(), stage.h, scene_game_props.spawn_interval / 2)))
            }
            for (const n of fruits_to_spawn) {
                const xdif = n.x - stage.mid.w
                const x_knock_off = ((stage.mid.w - Math.abs(xdif)) / stage.mid.w)
                n.vx = xdif * (0.2 + 0.8 * x_knock_off) * -0.05
                n.vy = -(22 + 5 * Math.random())
            }
            scene_game_props.spawn_counter = 0
        }
    }
    // Slice logic
    if (input.mouse_hold(0)) {
        const sliceables = obj.take('apple', 'orange', 'pear', 'banana', 'bomb') as Fruit[]
        for (const n of sliceables) {
            const distance_to_mouse = Math.hypot(n.x - input.mouse_x, n.y - input.mouse_y)
            if (distance_to_mouse < n.hit_range * n.xs) {
                n.slice()
                if (scene_game_props.state === 'play') {
                    scene_game_props.add_score(n.score)
                    if (n instanceof Bomb) {
                        scene_game_props.remove_lives(1)
                    }
                }
                if (n instanceof Bomb) {
                    view_game.shake(1000, 8)
                }
            }
        }
    }

    if (scene_game_props.state === 'gameover') {
        if (input.mouse_down(0)) {
            scene.restart()
        }
        smoke_emitter.set_area(0, stage.h + 100, stage.w, 0)
        smoke_emitter.emit(1)
    }
}

scene_game.render = () => {
    draw.on_transform(view_game.offset_position.x, view_game.offset_position.y, 1, 1, 0, () => {
        obj.render_all()
    })
}

scene_game.render_ui = () => {
    draw.on_transform(view_game.offset_position.x, view_game.offset_position.y, 1, 1, 0, () => {
        if (scene_game_props.state === 'play') {
            obj.take('scene_game_ui').forEach(n => n.render())

            draw.set_color('red')
            draw.set_font(font.l)
            draw.set_hvalign('left', 'middle')
            draw.text(90, 40, `${scene_game_props.score}`)

            draw.set_font(font.m)
            draw.set_hvalign('left', 'top')
            // draw.text(20, 80, `Best: ${scene_game_props.best_score}`)

            if (scene_game_props.lives < 3) {
                draw.image_transformed('bomb_life', stage.w - 96, 26, 0.7, 0.7, 0)
            }
            if (scene_game_props.lives < 2) {
                draw.image_transformed('bomb_life', stage.w - 60, 27, 0.8, 0.8, 0)
            }
            if (scene_game_props.lives < 1) {
                draw.image('bomb_life', stage.w - 21, 30)
            }
        }
        if (scene_game_props.state === 'gameover') {
            scene_game_props.fruitbox.render()

            draw.set_font(font.menu_l, { size: 64, style: 'bold' })
            draw.set_hvalign('center', 'middle')
            draw.set_color('red')
            draw.text(stage.mid.w, stage.mid.h / 2, `${scene_game_props.score}`)

            draw.set_font(font.menu_l, { style: 'bold' })
            draw.set_hvalign('center', 'middle')
            draw.set_color('black')
            draw.text(stage.mid.w, stage.mid.h, 'CLICK TO RESTART')
        }
    })

    draw_debug()
}
