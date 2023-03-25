class Apple extends Fruit {
    constructor(x: number, y: number) {
        super(x, y, 'apple_intact0')
        this.xs *= 0.9
        this.ys *= 0.9
    }
}

obj.add_name('apple')
