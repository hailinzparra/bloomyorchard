core.stage.setup()

core.setup = (title, canvas_parent, input_target, starting_scene) => {
    document.title = title
    canvas_parent.appendChild(core.stage.canvas)
    document.addEventListener('DOMContentLoaded', () => {
        core.stage.resize_event()
    })
    core.input.setup(input_target)
    core.scene.change_scene(starting_scene)
}
