import externalVariables from './externalVariables';
let originalPoints = externalVariables.originalPoints,
    tankX = externalVariables.tankObj.tankX,
    tankY = externalVariables.tankObj.tankY,
    angleWeapon = externalVariables.tankObj.angleWeapon;

const WIDTH = externalVariables.WIDTH;

const findLinePoints = (posX) => {
    let arr = [];

    for(let i = originalPoints.length - 1; i > 0; i--) {
        if(originalPoints[i][0] >= posX && originalPoints[i-1][0] <= posX) {
            let x1 = originalPoints[i-1][0],
                x2 = originalPoints[i][0],
                y1 = originalPoints[i-1][1],
                y2 = originalPoints[i][1];

            let time = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
            for (let j = 0; j <= time; j++) {
                let delta = j/time ;
                let a =  delta*(x2 - x1) + x1;
                let b =  delta*(y2 - y1) + y1;
                arr.push([Math.round(a), Math.round(b)]);
            }
            for(let i = 0; i < arr.length; i++) {
                if(arr[i][0] === posX) return (arr[i][1]);
            }
        }
    }
};

const animate = (time) => {
    const duration = 1500;
    let timePassed = time - start;

    if (timePassed > duration) {
        timePassed = duration;
    }
    draw(direct, timePassed);

    if(tankX >= WIDTH - 11 || tankX <= 11){
        window.cancelAnimationFrame(requestAnimFrame);
        console.log('stop!!!');
    } else if (timePassed < duration) {
        requestAnimFrame(animate);
    }
};

let start = performance.now(), direct;

const animateStart = (draw, duration) => {
    start = performance.now();
    requestAnimFrame(animate);
};

const draw = (direction, timePassed, checkTank = true) => {
    if(direction == "right") {
        tankX++;
    } else {
        tankX--;
    }

    if (checkTank) {
        tankY = findLinePoints(tankX);
        clear();
        fillBackground();
        drawTank(tankX, tankY, angleWeapon);
    }
};

module.exports.findLinePoints = findLinePoints;
module.exports.tankMove = (direction) => {
    direct = direction;
    let timePassed;
    animateStart(draw, 1500);
};
