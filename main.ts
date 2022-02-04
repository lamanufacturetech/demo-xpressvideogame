sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    otherSprite.destroy()
})
function initLevel (lvl: number) {
    info.setScore(0)
    scene.setBackgroundColor(lvl + 1)
    game.setDialogTextColor(15)
    game.setDialogFrame(img`
        c c c c c c c c c c c c c c c 
        c a a a a a a a a a a a a a c 
        c a c c c c c c c c c c c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c a a a a a a a a a c a c 
        c a c c c c c c c c c c c a c 
        c a a a a a a a a a a a a a c 
        c c c c c c c c c c c c c c c 
        `)
    game.showLongText("Niveau " + convertToText(lvl) + " !", DialogLayout.Bottom)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
let covid: Sprite = null
let masque: Sprite = null
let level = 1
let playette = sprites.create(img`
    . . . . . . 5 . 5 . . . . . . . 
    . . . . . f 5 5 5 f f . . . . . 
    . . . . f 1 5 2 5 1 6 f . . . . 
    . . . f 1 6 6 6 6 6 1 6 f . . . 
    . . . f 6 6 f f f f 6 1 f . . . 
    . . . f 6 f f d d f f 6 f . . . 
    . . f 6 f d f d d f d f 6 f . . 
    . . f 6 f d 3 d d 3 d f 6 f . . 
    . . f 6 6 f d d d d f 6 6 f . . 
    . f 6 6 f 3 f f f f 3 f 6 6 f . 
    . . f f d 3 5 3 3 5 3 d f f . . 
    . . f d d f 3 5 5 3 f d d f . . 
    . . . f f 3 3 3 3 3 3 f f . . . 
    . . . f 3 3 5 3 3 5 3 3 f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(playette)
playette.setStayInScreen(true)
initLevel(level)
game.onUpdate(function () {
    if (info.score() >= 50) {
        level += 1
        initLevel(level)
    }
})
game.onUpdateInterval(1000, function () {
    masque = sprites.create(img`
        . . . . . . . . . . . . . 6 6 6 
        6 6 6 . . . . . . . . . . 6 . 6 
        6 . 6 9 9 9 9 9 9 9 9 9 9 9 . 6 
        6 . . 9 9 9 9 9 9 9 9 9 9 9 . 6 
        6 . . 9 6 6 6 6 6 6 6 6 6 9 . 6 
        6 . . 9 9 9 9 9 9 9 9 9 9 9 . 6 
        6 . . 9 6 6 6 6 6 6 6 6 6 9 . 6 
        6 6 . 9 9 9 9 9 9 9 9 9 9 9 . 6 
        . 6 . 6 . . . . . . . . . 6 . 6 
        . 6 6 6 . . . . . . . . . 6 6 6 
        `, SpriteKind.Food)
    masque.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
})
game.onUpdateInterval(10000 / level, function () {
    covid = sprites.create(img`
        7 . . . . . . . 7 . . . 7 . . 7 
        7 7 . . . 7 7 7 7 7 7 7 . . 7 . 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 7 7 7 6 6 6 7 7 7 7 7 7 . 
        . . 7 7 7 7 6 7 6 7 7 7 7 7 7 . 
        . 7 7 7 7 7 6 6 6 7 7 7 7 7 7 7 
        . 7 7 7 7 7 7 7 7 7 7 7 7 6 6 6 
        . 7 7 7 7 7 7 7 7 7 7 7 7 6 7 6 
        7 7 6 7 7 7 7 7 7 7 7 7 7 6 6 6 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        . 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
        . 7 7 7 7 7 6 6 7 7 7 7 7 7 7 . 
        . . 7 7 7 7 6 6 7 7 7 7 7 7 7 . 
        . . 7 7 7 7 7 7 7 7 6 7 7 7 . . 
        . 7 . 7 7 7 7 7 7 7 7 7 7 . 7 . 
        7 . . . . . 7 7 7 7 7 . . . . 7 
        `, SpriteKind.Enemy)
    covid.setVelocity(10 * level, 10 * level)
    covid.setBounceOnWall(true)
    covid.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
})
