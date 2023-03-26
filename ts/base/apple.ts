class Apple extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'apple_intact0')
        this.hit_range = 64
        this.xs *= 0.9
        this.ys *= 0.9
        this.score = 7
    }
    slice() {
        obj.remove(this.id)
        for (let i = 0; i < 2; i++) {
            const slice = obj.instantiate('apple_slice', new AppleSlice(this.x, this.y))
            slice.angle_deg = this.angle_deg
            slice.xs = this.xs
            slice.ys = slice.ys
            slice.image_name = `apple_slice${i}`
            slice.vx = this.vx * 1.4 * (i === 0 ? -1 : 1)
            slice.vy = this.vy * 0.8
        }
        slice_emitter.set_colors('#e93b32', '#f15746', '#f15746')
        this.emit_puff()
        console.log('sliced!')
    }
}

class AppleSlice extends Apple {
    constructor(x: number, y: number) {
        super(x, y)
        this.image_name = 'apple_slice0'
        this.depth = 1
    }
}

obj.add_name('apple')
obj.add_name('apple_slice')
