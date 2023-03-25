interface CoreDraw {
    TWO_PI: number
    DEG_TO_RAD: number
    RAD_TO_DEG: number
    ctx: CanvasRenderingContext2D
    images: { [name: string]: { origin: CoreVec2, image: HTMLImageElement } }
    add_image(origin: CoreVec2, name: string, image: HTMLImageElement): HTMLImageElement
    set_alpha(a: number): void
    reset_alpha(): void
    /**
     * Draw image element
     */
    image_el(image: HTMLImageElement, x: number, y: number, origin?: CoreVec2): void
    /**
     * Draw image from storage
     */
    image(name: string, x: number, y: number): void
    draw(is_stroke?: boolean): void
    rect(x: number, y: number, w: number, h: number, is_stroke?: boolean): void
    circle(x: number, y: number, r: number, is_stroke?: boolean): void
    on_transform(x: number, y: number, xscale: number, yscale: number, angle_deg: number, draw_fn: Function): void
    image_transformed(name: string, x: number, y: number, xscale: number, yscale: number, angle_deg: number): void
    image_rotated(name: string, x: number, y: number, angle_deg: number): void
    image_ext(name: string, x: number, y: number, xscale: number, yscale: number, angle_deg: number, alpha: number): void // to add: blend mode
}

core.draw = {
    TWO_PI: 2 * Math.PI,
    DEG_TO_RAD: Math.PI / 180,
    RAD_TO_DEG: 180 / Math.PI,
    ctx: core.stage.canvas.getContext('2d')!,
    images: {},
    add_image(origin, name, image) {
        this.images[name] = {
            origin,
            image,
        }
        return this.images[name].image
    },
    set_alpha(a) {
        this.ctx.globalAlpha = a
    },
    reset_alpha() {
        this.ctx.globalAlpha = 1
    },
    image_el(img, x, y, origin = CoreVec2.half) {
        x -= img.width * origin.x
        y -= img.height * origin.y
        this.ctx.drawImage(img, x, y)
    },
    image(name, x, y) {
        const img = this.images[name]
        this.image_el(img.image, x, y, img.origin)
    },
    draw(is_stroke = false) {
        is_stroke ? this.ctx.stroke() : this.ctx.fill()
    },
    rect(x, y, w, h, is_stroke = false) {
        this.ctx.beginPath()
        this.ctx.rect(x, y, w, h)
        this.draw(is_stroke)
    },
    circle(x, y, r, is_stroke = false) {
        this.ctx.beginPath()
        this.ctx.arc(x, y, r, 0, this.TWO_PI)
        this.draw(is_stroke)
    },
    on_transform(x, y, xscale, yscale, angle_deg, draw_fn) {
        this.ctx.save()
        this.ctx.translate(x, y)
        this.ctx.rotate(angle_deg * this.DEG_TO_RAD)
        this.ctx.scale(xscale, yscale)
        draw_fn()
        this.ctx.restore()
    },
    image_transformed(name, x, y, xscale, yscale, angle_deg) {
        this.on_transform(x, y, xscale, yscale, angle_deg, () => this.image(name, 0, 0))
    },
    image_rotated(name, x, y, angle_deg) {
        this.image_transformed(name, x, y, 1, 1, angle_deg)
    },
    image_ext(name, x, y, xscale, yscale, angle_deg, alpha) {
        this.set_alpha(alpha)
        this.image_transformed(name, x, y, xscale, yscale, angle_deg)
        this.reset_alpha()
    },
}
