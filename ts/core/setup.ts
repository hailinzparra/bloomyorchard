core.stage.setup()

core.setup = (title, canvas_parent, input_target) => {
    document.title = title
    canvas_parent.appendChild(core.stage.canvas)
    document.addEventListener('DOMConatentLoaded', () => {
        core.stage.resize_event()
    })
    core.input.setup(input_target)
}
