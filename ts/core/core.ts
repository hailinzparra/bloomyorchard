interface Core {
    setup(
        title: string,
        canvas_parent: Element,
        input_target: CoreInput['target_element'],
        starting_scene: CoreScene,
    ): void
    stage: CoreStage
    input: CoreInput
    time: CoreTime
    draw: CoreDraw
    scene: CoreSceneManager
    runner: CoreRunner
}

declare const core: Core
