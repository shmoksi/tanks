var xSprite = 0;
var sprite = new Image();
sprite.src = './public/images/explosion_sheet.png';

function tick(coords){
    var xExplosion = coords.x - radius;
    var yExplosion = coords.y - radius;

    clear(); 
    fillBackground(); 
    drawTank(tankX, tankY); 
    ctx.drawImage(sprite, xSprite, 0, 134, 134, xExplosion, yExplosion, 134, 134);

    if (xSprite < 1608) {
        xSprite = xSprite + 134;
        window.setTimeout(tick, 70, coords);
    } else {
        xSprite = 0;
    }
}
