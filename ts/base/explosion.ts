class Explosion extends CoreObject {
    counter: number = 0
    image_index: number = 0
    image_interval: number = 70
    constructor(x: number, y: number) {
        super(x, y)
        this.depth = -1
    }
    update() {
        this.counter += time.dt
        if (this.counter > this.image_interval) {
            this.image_index++
            this.counter = 0
        }
        if (this.image_index >= draw.strips['explosion'].image_number) {
            obj.remove(this.id)
        }
    }
    render() {
        draw.strip_transformed('explosion', this.image_index, this.x, this.y, 1, 1, 0)
    }
}

obj.add_name('explosion')
