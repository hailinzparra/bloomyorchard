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
    render() {
        draw.image_ext(this.image_name, this.x, this.y, this.xs, this.ys, this.angle_deg, this.alpha)
        // draw.set_alpha(0.3)
        // draw.circle(this.x, this.y, this.hit_range)
        // draw.reset_alpha()
    }
}
