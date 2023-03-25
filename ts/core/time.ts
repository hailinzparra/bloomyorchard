interface CoreTime {
    t: number
    dt: number
    last_time: number
    fps: number
    update(t: number): void
}

core.time = {
    t: 0,
    dt: 0,
    last_time: 0,
    fps: 0,
    update(t) {
        this.last_time = this.t
        this.t = t
        this.dt = this.t - this.last_time
        this.fps = 1000 / this.dt
    },
}
