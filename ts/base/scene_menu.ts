const scene_menu = new CoreScene()

scene_menu.start = () => {
    console.log('start menu')
}

scene_menu.update = () => {
}

scene_menu.render = () => {
    // console.log(input.position)
    draw.rect(input.mouse_x, input.mouse_y, 32, 32)
}
