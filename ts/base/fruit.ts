class Fruit extends CoreObject {
    image_name: string
    vx: number = 0
    vy: number = 0
    xs: number
    ys: number
    angle_deg: number = Math.random() * 360
    alpha: number = 1
    gravity: number = 0.42
    hit_range: number = 100
    score: number = 0
    constructor(x: number, y: number, image_name: string) {
        super(x, y)
        this.image_name = image_name
        this.xs = 0.925 + 0.15 * Math.random()
        this.ys = this.xs
    }
    update_physics() {
        this.x += this.vx * time.scaled_dt
        this.y += this.vy * time.scaled_dt
        this.vy += this.gravity * time.scaled_dt
        this.angle_deg += this.vx * time.scaled_dt
    }
    pre_update() {
        this.update_physics()
        if (this.y > stage.h) {
            obj.remove(this.id)
        }
    }
    emit_puff() {
        slice_emitter.set_area(this.x, this.y)
        slice_emitter.emit(5, 8)
    }
    render() {
        draw.image_ext(this.image_name, this.x, this.y, this.xs, this.ys, this.angle_deg, this.alpha)
        // draw.set_alpha(0.3)
        // draw.circle(this.x, this.y, this.hit_range)
        // draw.reset_alpha()
    }
}

const slice_emitter = CoreEmitter.instantiate_emitter()
slice_emitter.set_direction_deg(180, 360)
slice_emitter.set_direction_deg_inc(0)
slice_emitter.set_grav(0.1)
slice_emitter.set_speed(4, 8)
slice_emitter.set_speed_inc(0)
slice_emitter.set_fric(1)
slice_emitter.set_life(500, 700)
slice_emitter.set_fade_out(0.8)
