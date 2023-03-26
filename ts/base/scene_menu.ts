const scene_menu = new CoreScene()

const smoke_emitter = CoreEmitter.instantiate_emitter()
smoke_emitter.reset(
    6000, 8000,
    0, 0,
    1, 1,
    6, 7,
    0.01, 0.02,
    -90, -90,
    -0.1, 0.1,
    20, 50,
    0, 0,
    ['#ffffff44', '#e9cc1a44', '#f3ab5044', '#b9c51f44'],
    1, 1,
)

scene_menu.update = () => {
    if (input.mouse_down(0)) {
        scene.change_scene(scene_game)
    }
    smoke_emitter.set_area(0, stage.h + 100, stage.w, 200)
    smoke_emitter.emit(1)
}

scene_menu.render_ui = () => {
    draw.set_font(font.menu_l, { style: 'bold' })
    draw.set_hvalign('center', 'middle')
    draw.set_color('black')
    draw.text(stage.mid.w, stage.mid.h, 'CLICK TO START')

    draw_debug()
}

const draw_debug = () => {
    if (__PROD) return
    draw.set_color('black')
    draw.set_font(font.m, { size: 16, style: '', family: 'Manrope' })
    draw.set_hvalign('center', 'bottom')
    draw.text(stage.mid.w, stage.h - 10, `FPS: ${Math.round(time.fps)}`)
}
