class Bomb extends Fruit {
    sleep_time: number
    constructor(x: number, y: number, sleep_time: number) {
        super(x, y, 'bomb_intact0')
        this.hit_range = 47
        this.sleep_time = sleep_time
        this.is_active = false
    }
    inactive_update() {
        this.sleep_time -= time.dt
        if (this.sleep_time <= 0) {
            this.is_active = true
        }
    }
    slice() {
        obj.remove(this.id)
        obj.instantiate('explosion', new Explosion(this.x, this.y))
    }
}

obj.add_name('bomb')
