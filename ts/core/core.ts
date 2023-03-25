interface Core {
    setup(
        title: string,
        canvas_parent: Element,
        input_target: CoreInput['target_element'],
    ): void
    stage: CoreStage
    input: CoreInput
}

declare const core: Core
