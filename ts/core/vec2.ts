class CoreVec2 {
    x: number
    y: number
    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }
    static one: CoreVec2 = new CoreVec2(1, 1)
    static zero: CoreVec2 = new CoreVec2(0, 0)
    static half: CoreVec2 = new CoreVec2(0.5, 0.5)
}
