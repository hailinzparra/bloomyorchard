class SceneGameUI extends CoreObject {
    xto: number
    yto: number
    lerp_speed: number = 0.05
    image_name: string
    constructor(x: number, y: number, image_name: string) {
        super(x, y)
        this.xto = this.x
        this.yto = this.y
        this.image_name = image_name
        this.is_visible = false
    }
    set_target_position(x: number, y: number, teleport: boolean = false) {
        this.xto = x
        this.yto = y
        if (teleport) {
            this.x = this.xto
            this.y = this.yto
        }
    }
    update() {
        this.x += (this.xto - this.x) * this.lerp_speed
        this.y += (this.yto - this.y) * this.lerp_speed
    }
    render() {
        draw.image(this.image_name, this.x, this.y)
    }
}

obj.add_name('scene_game_ui')
