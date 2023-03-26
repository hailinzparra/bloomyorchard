const scene_loading = new CoreScene()

scene_loading.start = () => {
    console.log('start loading')
}

scene_loading.render = () => {
    draw.rect(0, 0, stage.w * loader.get_load_progress(), 16)
    if (loader.is_loaded) {
        scene.change_scene(scene_game)
    }
}
