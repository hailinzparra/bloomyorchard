const scene_menu = new CoreScene()

scene_menu.update = () => {
    if (input.mouse_down(0)) {
        scene.change_scene(scene_game)
    }
}

scene_menu.render_ui = () => {
    draw.set_font(font.manrope_l)
    draw.set_hvalign('center', 'middle')
    draw.text(stage.mid.w, stage.mid.h, 'Click anywhere to start')
}
