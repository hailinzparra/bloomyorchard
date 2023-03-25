interface CoreRunner {
    is_running: boolean
    step(t?: number): void
    run(): void
    stop(): void
}

core.runner = {
    is_running: false,
    step(t = 0) {
        core.time.update(t)
        core.scene.update()
        core.stage.clear()
        core.scene.render()
        core.input.reset()
    },
    run() {
        const callback = (t: number) => {
            this.step(t)
            if (this.is_running) {
                window.requestAnimationFrame(callback)
            }
        }
        this.is_running = true
        window.requestAnimationFrame(callback)
    },
    stop() {
        this.is_running = false
    },
}
