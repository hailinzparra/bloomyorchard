loader.load_image(CoreVec2.half, 'apple_intact0', 'assets/images/apple_intact0.png')
loader.load_image(CoreVec2.half, 'apple_slice0', 'assets/images/apple_slice0.png')
loader.load_image(CoreVec2.half, 'apple_slice1', 'assets/images/apple_slice1.png')
loader.load_image(CoreVec2.half, 'apple_seed0', 'assets/images/apple_seed0.png')

loader.load_image(new CoreVec2(0.624, 0.585), 'orange_intact0', 'assets/images/orange_intact0.png')
loader.load_image(new CoreVec2(0.624, 0.585), 'orange_slice0', 'assets/images/orange_slice0.png')
loader.load_image(new CoreVec2(0.624, 0.585), 'orange_slice1', 'assets/images/orange_slice1.png')

loader.load_image(CoreVec2.half, 'pear_intact0', 'assets/images/pear_intact0.png')
loader.load_image(new CoreVec2(40 / 111, 82 / 142), 'pear_slice0', 'assets/images/pear_slice0.png')
loader.load_image(new CoreVec2(85 / 111, 100 / 142), 'pear_slice1', 'assets/images/pear_slice1.png')
loader.load_image(new CoreVec2(56 / 111, 54 / 142), 'pear_slice2', 'assets/images/pear_slice2.png')
loader.load_image(new CoreVec2(66 / 111, 108 / 142), 'pear_slice3', 'assets/images/pear_slice3.png')

loader.load_image(CoreVec2.half, 'banana_intact0', 'assets/images/banana_intact0.png')
loader.load_image(new CoreVec2(102 / 129, 79 / 155), 'banana_slice0', 'assets/images/banana_slice0.png')
loader.load_image(new CoreVec2(50 / 129, 129 / 155), 'banana_slice1', 'assets/images/banana_slice1.png')

loader.load_image(CoreVec2.half, 'bomb_intact0', 'assets/images/bomb_intact0.png')
loader.load_strip(CoreVec2.half, 'explosion', 'assets/images/explosion_strip8.png', 8)

loader.load_image(CoreVec2.half, 'fruitbox', 'assets/images/fruitbox.png')
loader.load_image(CoreVec2.half, 'fruit_coin', 'assets/images/fruit_coin.png')
loader.load_image(CoreVec2.half, 'bomb_ui_box', 'assets/images/bomb_ui_box.png')
loader.load_image(CoreVec2.half, 'bomb_life', 'assets/images/bomb_life.png')

const font = {
    m: new CoreFont(26, 'bold', 'Ewert'),
    l: new CoreFont(42, 'bold', 'Ewert'),
    menu_l: new CoreFont(42, '', 'Ewert'),
}
