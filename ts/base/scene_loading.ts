const scene_loading = new CoreScene()

scene_loading.start = () => {
    console.log('start loading')
}

scene_loading.update = () => {
    console.log('update loading...')
    if (time.t > 0) {
        scene.change_scene(scene_menu)
    }
}
