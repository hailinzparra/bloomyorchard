interface Core {
    setup(title: string, canvas_parent: Element): void
    stage: CoreStage
}

declare const core: Core
