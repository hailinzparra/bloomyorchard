const scene_loading = new CoreScene()

scene_loading.start = () => {
    console.log('start loading')
}

scene_loading.render = () => {
    draw.set_font(font.menu_l, { style: 'bold' })
    draw.set_hvalign('center', 'middle')
    draw.set_color('black')
    draw.text(stage.mid.w, stage.mid.h, 'LOADING')
    draw.rect(0, stage.h - 16, stage.w * loader.get_load_progress(), 16)
    if (loader.is_loaded) {
        scene.change_scene(scene_menu)
    }
}
