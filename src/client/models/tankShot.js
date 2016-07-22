'use strict';
import paper from 'paper';
import externalVariables from './externalVariables';
import externalFunctions from './externalFunctions';
import showChatWindow from './chatField';
import tankMovement from './tankMovement';

const findLinePoints = tankMovement.findLinePoints,
    tankMove = tankMovement.tankMove,
    getId = externalFunctions.getId,
    requestAnimFrame = externalFunctions.requestAnimFrame;

let originalPoints = externalVariables.originalPoints,
    tankX = externalVariables.tankObj.tankX,
    tankY = externalVariables.tankObj.tankY,
    angleWeapon = externalVariables.tankObj.angleWeapon;

const WIDTH = externalVariables.WIDTH,
    HEIGHT = externalVariables.HEIGHT,
    TANKWIDTH = externalVariables.TANKWIDTH,
    TANKHEIGHT = externalVariables.TANKHEIGHT,
    WEAPONWIDTH = externalVariables.WEAPONWIDTH,
    WEAPONHEIGHT = externalVariables.WEAPONHEIGHT;

// const radius = 40; // TODO remove

var ctx;
// var tankX, tankY;
// var angleWeaponInc = 0;

// let angleWeapon,
let angle,
    power;

module.exports.initGame = function () {
    var lastTimeTankMoved;
    var pattern;
    const tankHeight = 30,
        tankWidth = 70,
        weaponHeight = 20,
        weaponWidth = 35,
        tankImage = new Image(),
        weaponImage = new Image();

    // let angleWeapon10 = 10*Math.PI/180;
    var backCanvas;
    var backCtx, canvas;

/* ====== initialization ======== */
    backCanvas = document.createElement('canvas');

    paper.setup(backCanvas);
    backCanvas.width  = WIDTH;
    backCanvas.height = HEIGHT;
    backCtx = backCanvas.getContext('2d');

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    power =  parseInt(getId('power').innerHTML);
    angle = parseInt(getId('angle').innerHTML);

/* ====== Ground and sky drawing ======== */

    var polygon = function(array, color) {
        backCtx.beginPath();

        array.forEach(function(pair, number) {
            if(number == 0) {
                backCtx.moveTo(pair[0], pair[1]);
            } else {
                backCtx.lineTo(pair[0], pair[1]);
            }
        });
        backCtx.fillStyle=color;
        backCtx.fill();
        backCtx.closePath();
    };

    var drawGround = function(){

        var points = originalPoints;

        var colors = ['#040905', '#030C37', '#352E58', '#2F010B', '#991E23', '#E72E10', '#FFC057'];
        colors.forEach(function (color) {
            polygon(points, color);

            // points = points.map(function(pair) {
            //     return [pair[0], pair[1] + 40];
            // });
        })
    };

    var drawSky = function(){
        var grd=backCtx.createLinearGradient(0,0,0,500);
        grd.addColorStop(0,"#172059");
        grd.addColorStop(0.3,"#6D6D85");
        grd.addColorStop(1,"#A0837D");

        backCtx.fillStyle=grd;
        backCtx.fillRect(0,0,800,500);
    };

/* ====== Tank drawing ======== */

    /*const tankImage = new Image();
    const weaponImage = new Image();
    var xCof, yCof;
    var angle_second;
    var angleWeapon;*/

    const drawTankFn = () => {

        tankImage.src = './public/images/tankVehicle.png';
        weaponImage.src = './public/images/tankWeapon_straight.png';


        return (xCoordinate, yCoordinate, angle) => {

            // angleWeapon = -tiltTank(xCoordinate);

            ctx.save();
            ctx.translate(xCoordinate, yCoordinate-weaponHeight);
            ctx.rotate(-angle);
            ctx.drawImage(tankImage,-tankWidth/2-weaponWidth/3,-tankHeight/2+weaponHeight/2 ,
            tankWidth, tankHeight);
            ctx.restore();

            moveWeapon(xCoordinate, yCoordinate, angle);
        };

    };

    const drawTank = drawTankFn();

/* ====== Tank Weapon Movement ======== */

    let moveWeapon = (xCoordinate, yCoordinate, angle) => {
            ctx.save();
            ctx.translate(xCoordinate, yCoordinate-weaponHeight);
            ctx.rotate(-angle- angle*Math.PI/180);
            ctx.drawImage(weaponImage, 0,  -weaponHeight/2, weaponWidth, weaponHeight);
            ctx.restore();
    };

    let moveWeaponKeyDown = (evt) => {
        switch (evt.keyCode) {
                case 38:    //Up arrow was pressed /
                    if(angle >=  80) {return;}
                    angle +=5;
                    clear();
                    fillBackground();
                    angleWeapon = angle*Math.PI/180;
                    drawTank(tankX, tankY, angleWeapon);
                    getId('angle').innerHTML = angle;
                    break;

                case 40:   //Down arrow was pressed /
                  if(angle <=  0) {return;}
                   angle -=5;
                    clear();
                    fillBackground();
                    angleWeapon = angle*Math.PI/180;
                    drawTank(tankX, tankY, angleWeapon);
                    getId('angle').innerHTML = angle;
                    break;
        }
    };

    document.addEventListener('keydown',moveWeaponKeyDown,true);

/* ====== Tank Tilt ======== */

    var tiltTank = function(posX) {
        let angle = 0;
        for(let i = originalPoints.length - 1; i > 0; i--) {
            if(originalPoints[i][0] >= posX && originalPoints[i-1][0] <= posX) {
                var x1 = originalPoints[i-1][0],
                x2 = originalPoints[i][0],
                y1 = originalPoints[i-1][1],
                y2 = originalPoints[i][1];
            }
        }
        let tan = (y1 > y2) ? (y1 - y2) / (x1 - x2) : (y2 - y1) / (x2 - x1);

        angle = Math.atan(tan);

        return angle;
    };


/* ======  Tank movement ======== */

    const doKeyDown = (evt) => {
        let now = new Date().getTime();
        if(now - lastTimeTankMoved > 1500) {
            switch (evt.keyCode) {
                case 37:  /* Left arrow was pressed */
                    tankMove('left');
                    break;
                case 39:  /* Right arrow was pressed */
                    tankMove('right');
                    break;
                case 13: /*ENTER*/
                    makeShot();
                break;

            }
        lastTimeTankMoved = now;
        }
    };
    window.addEventListener('keydown',doKeyDown,true);

    const clear = () => {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    };

    const fillBackground = () => {
        ctx.rect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle = pattern;
        ctx.fill();
    };


/* ======  Vika's part - Navigation ======== */

    getId('fire').onclick = function() {
        makeShot();
    };

    getId('morePower').onclick = function (){
        power++;
        getId('power').innerHTML = power;
        power = parseInt(getId('power').innerHTML);
    };

    getId('lessPower').onclick = function (){
        power--;
        getId('power').innerHTML = power;
        power = parseInt(getId('power').innerHTML);
    };

    getId('moreAngle').onclick = function (){

        getId('angle').innerHTML = angle;

        if(angle >= 80) {return;}
        angle +=5;
        getId('angle').innerHTML = angle;
        angle = parseInt(getId('angle').innerHTML);

        clear();
        fillBackground();
        angleWeapon = angle*Math.PI/180;
        drawTank(tankX, tankY, angleWeapon);
    };

    getId('lessAngle').onclick = function (){

        getId('angle').innerHTML = angle;

        if(angle <= 0) {return;}
        angle -=5;
        getId('angle').innerHTML = angle;
        angle = parseInt(getId('angle').innerHTML);

        clear();
        fillBackground();
        angleWeapon = angle*Math.PI/180;
        drawTank(tankX, tankY, angleWeapon);
    };

    getId('chatBtn').onclick = showChatWindow;

    (function initialization() {
        clear();
        drawSky();
        drawGround();

        pattern = ctx.createPattern(backCanvas, "no-repeat");
        tankX = Math.floor((Math.random() * 330) + 30);
        tankY = findLinePoints(tankX);
        lastTimeTankMoved = 0;
        fillBackground();
        angleWeapon = -tiltTank(tankX, tankY);
        weaponImage.onload = function() {
            drawTank(tankX, tankY, angleWeapon);
        }
    })();

    window.clear = clear;
    window.fillBackground = fillBackground;
    window.drawTank = drawTank;
    window.requestAnimFrame = requestAnimFrame;
    window.getId = getId;
    window.weaponWidth=weaponWidth;
    window.drawSky=drawSky;
    window.drawGround=drawGround;
    window.backCanvas=backCanvas;
};
