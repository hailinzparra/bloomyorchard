const scene_menu = new CoreScene()

scene_menu.start = () => {
    console.log('start menu')
}

scene_menu.update = () => {
}

scene_menu.render = () => {
    draw.rect(input.mouse_x, input.mouse_y, 32, 32)
    draw.image_ext((Math.round(time.t / 500) % 2 === 0) ? 'apple_slice0' : 'apple_intact0', input.mouse_x, input.mouse_y, 1 + 0.2 * Math.sin(time.t / 1000), 1 + 0.2 * Math.cos(time.t / 20000), time.t / 30, 0.8)
}
