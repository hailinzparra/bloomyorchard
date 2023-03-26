class Orange extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'orange_intact0')
        this.hit_range = 55
        this.score = 8
    }
    slice() {
        obj.remove(this.id)
        for (let i = 0; i < 2; i++) {
            const slice = obj.instantiate('orange_slice', new OrangeSlice(this.x, this.y))
            slice.angle_deg = this.angle_deg
            slice.xs = this.xs
            slice.ys = slice.ys
            slice.image_name = `orange_slice${i}`
            slice.vx = this.vx * 1.4 * (i === 0 ? -1 : 1)
            slice.vy = this.vy * 0.8
        }
        slice_emitter.set_colors('#f5b668', '#ef9523', '#ef931e')
        this.emit_puff()
    }
}

class OrangeSlice extends Orange {
    constructor(x: number, y: number) {
        super(x, y)
        this.image_name = 'orange_slice0'
        this.depth = 1
    }
}

obj.add_name('orange')
obj.add_name('orange_slice')
