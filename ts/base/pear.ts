class Pear extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'pear_intact0')
        this.hit_range = 64
        this.score = 7
    }
    slice() {
        obj.remove(this.id)
        let image_index_offset = 0
        if (Math.random() > 0.4) image_index_offset = 2
        const this_image = draw.images[this.image_name]
        for (let i = 0; i < 2; i++) {
            const slice_image_name = `pear_slice${i + image_index_offset}`
            const slice_image = draw.images[slice_image_name]
            const pos_dif = Math.hypot(
                (slice_image.origin.x - this_image.origin.x) * this_image.image.width * this.xs,
                (slice_image.origin.y - this_image.origin.y) * this_image.image.height * this.ys,
            )
            const angle_dif_rad = Math.atan2(
                slice_image.origin.y - this_image.origin.y,
                slice_image.origin.x - this_image.origin.x,
            ) + this.angle_deg * draw.DEG_TO_RAD
            const slice = obj.instantiate('pear_slice', new PearSlice(
                this.x + pos_dif * Math.cos(angle_dif_rad),
                this.y + pos_dif * Math.sin(angle_dif_rad),
            ))
            slice.angle_deg = this.angle_deg
            slice.xs = this.xs
            slice.ys = slice.ys
            slice.image_name = slice_image_name
            slice.vx = this.vx * 1.4 * (i === 0 ? -1 : 1)
            slice.vy = this.vy * 0.8
        }
        slice_emitter.set_colors('#d1e901', '#c5db00', '#b9cd00')
        this.emit_puff()
    }
}

class PearSlice extends Pear {
    constructor(x: number, y: number) {
        super(x, y)
        this.image_name = 'pear_slice0'
        this.depth = 1
    }
}

obj.add_name('pear')
obj.add_name('pear_slice')
