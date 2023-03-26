class Banana extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'banana_intact0')
        this.hit_range = 72
        this.score = 5
    }
    slice() {
        obj.remove(this.id)
        for (let i = 0; i < 2; i++) {
            const slice = obj.instantiate('banana_slice', new BananaSlice(this.x, this.y))
            slice.angle_deg = this.angle_deg
            slice.xs = this.xs
            slice.ys = slice.ys
            slice.image_name = `banana_slice${i}`
            slice.vx = this.vx * 1.4 * (i === 0 ? -1 : 1)
            slice.vy = this.vy * 0.8
        }
        slice_emitter.set_colors('#fff21e', '#fdff1e', '#eeff1e')
        this.emit_puff()
    }
}

class BananaSlice extends Banana {
    constructor(x: number, y: number) {
        super(x, y)
        this.image_name = 'banana_slice0'
        this.depth = 1
    }
}

obj.add_name('banana')
obj.add_name('banana_slice')
