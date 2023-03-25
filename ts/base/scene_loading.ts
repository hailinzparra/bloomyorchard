const scene_loading = new CoreScene()

scene_loading.start = () => {
    console.log('start loading')
}

scene_loading.update = () => {
    console.log('update loading...')
    if (core.time.t > 5000) {
        core.scene.change_scene(scene_menu)
    }
}
