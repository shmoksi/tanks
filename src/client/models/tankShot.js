'use strict';

// document.addEventListener("DOMContentLoaded", function(){
    function initGame(){

        //      <------initialization------>
        var backCanvas = document.createElement('canvas');
        var WIDTH = backCanvas.width  = 800;
        var HEIGHT = backCanvas.height = 500;
        var backCtx = backCanvas.getContext('2d');
        var canvas = document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        var lastTimeTankMoved;
        var tankX, tankY;
        var pattern;

        var originalPoints = [[0, 280],[20, 285],[40, 310],[145, 325],[125, 380],[165, 330],[175, 340],[220, 350],
        [240, 300],[280, 280],[300, 250],[340, 180],[370, 150],[440, 170],[550, 410],[530, 350],[540, 310],
        [575, 290],[630, 320],[685, 320],[690, 335],[700, 320],[750, 280],[755, 285],[795, 250],[800, 250],
        [800, 500],[0, 500],[0, 280]];

        // <------Ground and sky drawing------>

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

        // <------Tank drawing------>

		/*const tankImage = new Image();
    	const weaponImage = new Image();
        var xCof, yCof;
        var angle_second;
        var angleWeapon;
        var angle_weapon = 0;*/

        const tankHeight = 30,
        tankWidth = 70,
        weaponHeight = 20,
        weaponWidth = 35,
        tankImage = new Image(),
        weaponImage = new Image();

        let angleWeapon,
        angleWeaponInc = 0,
        angleWeapon10 = 10*Math.PI/180;

        const drawTankFn = () => {

            tankImage.src = './public/images/tankVehicle.png';
            weaponImage.src = './public/images/tankWeapon.png';


            return (xCoordinate, yCoordinate, angleW) => {

                angleWeapon = -tiltTank(xCoordinate);

                ctx.save();
                ctx.translate(xCoordinate, yCoordinate-30);
                ctx.translate(tankWidth / 2, tankHeight / 2);
                ctx.rotate(-angleWeapon);
                ctx.drawImage(tankImage, -(tankWidth / 2), -(tankHeight / 2), tankWidth, tankHeight);
                ctx.restore();

                moveWeapon(xCoordinate, yCoordinate, angleW);
            };

        }

        const drawTank = drawTankFn();

        // <------Tank Weapon Movement------>

       /* var angle_weapon_rot = angle_weapon_rot || 0;*/

       /* var moveWeapon = function (xCoordinate, yCoordinate, angleWeapon) {
            var tankHeight = 30;
            var tankWidth = 70;
            var weaponHeight = 20;
            var weaponWidth = 35;

            ctx.save();
            ctx.translate(xCoordinate+weaponWidth+12, yCoordinate-weaponWidth/2-weaponHeight/4);
            ctx.rotate(-angle_weapon_rot*Math.PI/180);
            ctx.drawImage(weaponImage, 0,-weaponHeight-4+weaponHeight/4, weaponWidth,weaponHeight);
            ctx.restore();

            ctx.save();
            ctx.translate(xCoordinate, yCoordinate - 30);
            ctx.translate(tankWidth / 2, tankHeight / 2);
            ctx.rotate(angle_second);
            ctx.drawImage(tankImage, -(tankWidth / 2), -(tankHeight / 2), tankWidth, tankHeight);
            ctx.restore();
        }
*/

        var moveWeapon = (xCoordinate, yCoordinate, angleW) => {

                ctx.save();

                if (angleWeapon > 0) {
                    var angle_curr = angleWeapon / Math.PI * 180;
                    angle_curr = Math.round(angle_curr / 10);
                    var xCof = angle_curr * 2.45;
                    var yCof = angle_curr * 0.725;
                }
                else {
                    var angle_curr = -angleWeapon / Math.PI * 180;
                    angle_curr = Math.round(angle_curr / 10);
                    var xCof = angle_curr * 0.25;
                    yCof = -angle_curr * 2.6;
                }

                ctx.translate(xCoordinate-4-xCof, yCoordinate-30-yCof);
                ctx.translate(tankWidth-weaponWidth/2, tankHeight/2-weaponHeight/2);

                if (typeof angleW != 'undefined') {
                    angleWeapon += angleW;
                }

                ctx.rotate(-angleWeapon);
                ctx.drawImage(weaponImage, -weaponWidth/2+weaponWidth/2,  -weaponHeight+weaponHeight/2, weaponWidth, weaponHeight);
                ctx.restore();
        }

        /*function moveWeaponKeyDown(evt) {
            switch (evt.keyCode) {
                    case 38:    //Up arrow was pressed /
                        if(angleWeaponInc >=  7*angleWeapon10) {return;}
                        clear();
                        fillBackground();
                        angleWeaponInc += angleWeapon10;
                        drawTank(tankX, tankY,angleWeaponInc);
                        //console.log('case 38 - ' + angleWeaponInc);
                        break;

                    case 40:   //Down arrow was pressed /
                        if(angleWeaponInc <= - angleWeapon10) {return;}
                        clear();
                        fillBackground();
                        angleWeaponInc -= angleWeapon10;
                        drawTank(tankX, tankY,angleWeaponInc);
                        //console.log('case 40 - ' + angleWeaponInc);
                        break;
            }
        }

        document.addEventListener('keydown',moveWeaponKeyDown,true);*/
        // <------Tank Tilt------>

        let angle_weapon = 0;

        let reDrawWeapon = (angle) => {
            clear();
            drawTank(tankX, tankY, angle);
            fillBackground();
        }

        var tiltTank = function(posX) {
            for(var i = originalPoints.length - 1; i > 0; i--) {
                if(originalPoints[i][0] >= posX && originalPoints[i-1][0] <= posX) {
                    var x1 = originalPoints[i-1][0],
                    x2 = originalPoints[i][0],
                    y1 = originalPoints[i-1][1],
                    y2 = originalPoints[i][1];
                }
            }
            var tan = (y1 > y2) ? (y1 - y2) / (x1 - x2) : (y2 - y1) / (x2 - x1);

            this.angle = Math.atan(tan);

            // if (tan < 0)
                // this.angle += 180;

            return this.angle;
        }

        // <------Tank movement------>

        var findLinePoints = function(posX) {
            var arr = [];

            for(var i = originalPoints.length - 1; i > 0; i--) {
                if(originalPoints[i][0] >= posX && originalPoints[i-1][0] <= posX) {
                    var x1 = originalPoints[i-1][0],
                        x2 = originalPoints[i][0],
                        y1 = originalPoints[i-1][1],
                        y2 = originalPoints[i][1];
                    // console.log("Vova: " + x1 + " " + x2 + " " + y1 + " " + y2);
                    var time = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
                    for (var j = 0; j <= time; j++) {
                        var delta = j/time ;
                        var a =  delta*(x2 - x1) + x1;
                        var b =  delta*(y2 - y1) + y1;
                        arr.push([Math.round(a), Math.round(b)]);
                    }
                    for(var i = 0; i < arr.length; i++) {
                        if(arr[i][0] === posX) return (arr[i][1]);
                    }
                }
            }
        };

        var clear = function() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);
        };

        var fillBackground = function () {
            ctx.rect(0,0,WIDTH,HEIGHT);
            ctx.fillStyle = pattern;
            ctx.fill();
        };

        var animate = function(draw, duration) {
            var start = performance.now();
            requestAnimFrame(function animate(time) {
                var timePassed = time - start;
                if (timePassed > duration) timePassed = duration;
                draw(timePassed);
                if(tankX >= WIDTH - 11 || tankX <= 11){
                    window.cancelAnimationFrame(requestAnimFrame);
                    console.log('stop!!!');
                } else if (timePassed < duration) {
                    requestAnimFrame(animate);
                }
            });
        };

        var tankMove = function(direction) {
            animate(function(timePassed) {
                if(direction === "right") {
                    tankX++;
                } else {
                    tankX--;
                }
                angle = parseInt(getId('angle').innerHTML);
                tankY = findLinePoints(tankX);
                clear();
                fillBackground();
                drawTank(tankX, tankY,angleWeaponInc);
            }, 1500);
        };


        function doKeyDown(evt){
            var now = new Date().getTime();
            if(now - lastTimeTankMoved > 1500) {
                switch (evt.keyCode) {
                    case 37:  /* Left arrow was pressed */
                        tankMove('left');
                        break;
                    case 39:  /* Right arrow was pressed */
                        tankMove('right');
                        break;

                    case 32: /*SPACE*/
                        dt2=0;
                        bullets.push({ pos: [tankX, tankY],
                            imgInf: new ImgInf(bulletImg.src,[0,0],angle,power),
                            angle: angle,
                            bulletSpeed: power
                        });
                        lastFire = Date.now();
                        shotStart();
                        break;
                    case 13: /*ENTER*/
                        makeShot();
                    break;

                }
            lastTimeTankMoved = now;
            }
        }

        window.addEventListener('keydown',doKeyDown,true);

        function makeShot() {
            dt2=0;
            bullets.push({ pos: [tankX+45, tankY-44],
                imgInf: new ImgInf(bulletImg.src,[0,0],angle,power),
                angle: angle,
                bulletSpeed: power
            });
            lastFire = Date.now();
            shotStart();
        }


// <------Vika's part - Navigation ------>

        function getId(id) {
            return document.getElementById(id);
        }

        getId('fire').onclick = function() {
            makeShot();
        }

        getId('morePower').onclick = function (){
            power++;
            getId('power').innerHTML = power;
            power = parseInt(getId('power').innerHTML);
        }
        getId('lessPower').onclick = function (){
            power--;
            getId('power').innerHTML = power;
            power = parseInt(getId('power').innerHTML);
        }

        getId('moreAngle').onclick = function (){

            getId('angle').innerHTML = angle;

            if(angle >= 80) {return;}
            angle +=10;
            getId('angle').innerHTML = angle;
            angle = parseInt(getId('angle').innerHTML);


            clear();
            fillBackground();
            angleWeaponInc = angle*Math.PI/180;
            drawTank(tankX, tankY,angleWeaponInc);
            console.log("angle " + angle);
        }
        getId('lessAngle').onclick = function (){

            getId('angle').innerHTML = angle;

            getId('angle').innerHTML = angle;
            if(angle <= 0) {return;}
            angle -=10;
            getId('angle').innerHTML = angle;
            angle = parseInt(getId('angle').innerHTML);

             clear();
            fillBackground();
            angleWeaponInc = angle*Math.PI/180;
            drawTank(tankX, tankY,angleWeaponInc);
            console.log("angle " + angle);
        }

        // <------Vika's part - Explosion ------>

        var xSprite = 0;
        var sprite = new Image();
        sprite.src = './public/images/explosion_sheet.png';
        function tick(coords){
            var xExplosion = coords.x - 40;   // x = x-central - R;
            var yExplosion = coords.y - 40;   // y = y-central - R;

            clear();

            fillBackground(); // it's instead of ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTank(tankX, tankY);
            ctx.drawImage(sprite, xSprite, 0, 134, 134, xExplosion, yExplosion, 134, 134);
            if (xSprite < 1608) {
                xSprite = xSprite + 134;
                window.setTimeout(tick, 70, coords);
                // console.log('Coords are: ' + coords.x + ' and ' + coords.y);
            } else {
                xSprite = 0;
            }
        }


        //<------Maks's part-------->


        var requestAnimFrame = (function(){
            return window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
        })();
        var power =  parseInt(getId('power').innerHTML);
        var angle = parseInt(getId('angle').innerHTML);;
        var lastTime;
        var dt2=0;
        var bullets = [];
        var bullet;
        var lastFire = Date.now();
        var gameTime = 0;
        var bulletImg=new Image();
        bulletImg.src='./public/images/bullet2.png';

        function drawBullet() {
            clear();

            fillBackground();
            drawTank(tankX,tankY);

            var now = Date.now();
            var dt = (now - lastTime) / 1000.0;
            update(dt);
            render();
            lastTime = now;
        }

        function shotStart() {
            lastTime = Date.now();
            drawBullet();
        }

        function update(dt) {
            gameTime += dt;
            updateEntities(dt);
        }

        function updateEntities(dt) {
            for(var i=0; i<bullets.length; i++) {
                bullet = bullets[i];
                bullet.pos[0] = tankX+45 + bullet.bulletSpeed * dt2*Math.cos(bullet.angle*Math.PI/180);
                bullet.pos[1]=tankY-44-(bullet.bulletSpeed*dt2*Math.sin(bullet.angle*Math.PI/180)-9.8*dt2*dt2/2);
                dt2+=2*dt;

                var coords = {x:bullet.pos[0],
                    y:bullet.pos[1],
                    width:10,
                    height:10};

                if (checkCol(coords,originalPoints)){
                    console.log( 'x:' +  (coords.x + coords.width), 'y:' + (coords.y + coords.height));
                    bullets.splice(i, 1);
                    tick(coords);                                   // <------ Explosion ------>
                    window.cancelAnimationFrame(requestAnimFrame);
                    i--;

                    originalPoints = calculateDamageArea(originalPoints, (coords.x + coords.width), (coords.y + coords.height));

                    // temporary solution for redrawing updated array originalPoints
                    clear();
                    drawSky();
                    drawGround();

                    pattern = ctx.createPattern(backCanvas, "no-repeat");
                    tankY = findLinePoints(tankX);

                    fillBackground();
                    drawTank(tankX, tankY);
                }
                else if(bullet.pos[0]>WIDTH || bullet.pos[1]>HEIGHT)
                {
                    bullets.splice(i, 1);
                    window.cancelAnimationFrame(requestAnimFrame);
                    i--;
                    clear();
                    drawSky();
                    drawGround();

                    pattern = ctx.createPattern(backCanvas, "no-repeat");
                    tankY = findLinePoints(tankX);

                    fillBackground();
                    drawTank(tankX, tankY);
                }
                else
                {
                    requestAnimFrame(drawBullet);
                }
            }
        }

        function render() {
            renderEntities(bullets);
        };

        function renderEntities(list) {
            for(var i=0; i<list.length; i++) {
                renderEntity(list[i]);
            }
        }

        function renderEntity(entity) {
            ctx.save();
            ctx.translate(entity.pos[0], entity.pos[1]);
            entity.imgInf.render(ctx,dt2);
            ctx.restore();
        }

        function reset() {
            gameTime = 0;
            bullets = [];
        };

        (function() {
            function ImgInf(url, pos, angle, v0) {
                this.pos = pos;
                this.url = url;
                this.angle=angle;
                this.v0=v0;
            };

            ImgInf.prototype = {

                render: function(ctx, dt2) {
                    var x = this.pos[0];
                    var y = this.pos[1];

                    ctx.translate(x,y);
                    var A=this.v0*Math.cos(this.angle*Math.PI/180);
                    var an=Math.atan(((this.v0)*Math.sin(this.angle*Math.PI/180)-9.81*dt2)/A);
                    ctx.rotate(-an);
                    ctx.drawImage(bulletImg,x, y);
                    ctx.restore();
                }
            };

            window.ImgInf = ImgInf;
        })();

        (function initialization() {
            clear();
            drawSky();
            drawGround();

            pattern = ctx.createPattern(backCanvas, "no-repeat");
            tankX = Math.floor((Math.random() * 330) + 30);
            tankY = findLinePoints(tankX);
            lastTimeTankMoved = 0;
            fillBackground();
            angle_weapon = tiltTank(tankX);
            weaponImage.onload = function() {
            	drawTank(tankX, tankY);
            }
        })();

    }
// });
