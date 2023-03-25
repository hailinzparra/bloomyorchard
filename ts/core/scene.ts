interface CoreSceneManager {
    DUMMY_SCENE: CoreScene
    current_scene: CoreScene
    previous_scene: CoreScene
    change_scene(new_scene: CoreScene): void
    update(): void
    render(): void
    render_ui(): void
}

class CoreScene {
    constructor() { }
    start() { }
    update() { }
    render() { }
    render_ui() { }
}

core.scene = {
    DUMMY_SCENE: new CoreScene(),
    current_scene: null as any,
    previous_scene: null as any,
    change_scene(new_scene) {
        this.previous_scene = this.current_scene
        this.current_scene = new_scene
        if (this.current_scene !== this.previous_scene) {
            this.current_scene.start()
        }
    },
    update() {
        this.current_scene.update()
    },
    render() {
        this.current_scene.render()
    },
    render_ui() {
        this.current_scene.render_ui()
    },
}

core.scene.current_scene = core.scene.DUMMY_SCENE
core.scene.previous_scene = core.scene.DUMMY_SCENE
