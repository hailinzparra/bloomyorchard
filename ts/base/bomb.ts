class Bomb extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'bomb_intact0')
        this.hit_range = 64
    }
    slice() {
        obj.remove(this.id)
        obj.instantiate('explosion', new Explosion(this.x, this.y))
        console.log('bomb explode!')
    }
}

obj.add_name('bomb')
