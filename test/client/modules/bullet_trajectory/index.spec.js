/*import explosion from '/home/olga/Desktop/project/pocket-tanks/src/client/models/shotTrajectory';
import externalVariables from '/home/olga/Desktop/project/pocket-tanks/src/client/models/externalVariables'; 
import paper from 'paper';

describe ("Test shot trajectory", function () {

		let bullet, dt2,
		    tankX, tankY, 
		    angleWeapon, bulletImg;
		    let canvas=document.createElement("canvas");

		beforeEach( function() {
			bulletImg = {};

			bullet = { pos: [tankX, tankY],
            	imgInf: bulletImg,
            	angle: 0,
            	bulletSpeed: 0
            };
		});

		it ("Trajectory should be defined", function(){
			dt2 = 1;
            bullet.angle = 0;
			tankX = 100;
			tankY = 100;
			bullet.bulletSpeed = 1;

			explosion.generateExplosion(dt2, bullet, tankX, tankY, bullet.angle, bullet.angle, false);

			expect(bullet.pos[0]).toBeDefined();
			expect(bullet.pos[1]).toBeDefined();
		});

		it ("Trajectory at time moment 1", function(){
			dt2 = 1;
            bullet.angle = 10;
			tankX = 100;
			tankY = 150;
			bullet.bulletSpeed = 7;

			explosion.generateExplosion(dt2, bullet, tankX, tankY, bullet.angle, bullet.angle, false);

			expect(bullet.pos[0]).toEqual(53.893080023174704);
			expect(bullet.pos[1]).toEqual(241.41194533503725);
 	    });

		it ("Trajectory at time moment 2", function(){
			dt2 = 2;
            bullet.angle = 30;
			tankX = 50;
			tankY = 100;
			bullet.bulletSpeed = 5;
			explosion.generateExplosion(dt2, bullet, tankX, tankY, bullet.angle, bullet.angle, false);
			expect(bullet.pos[0]).toEqual(97.07011146647453);
			expect(bullet.pos[1]).toEqual(442.3101070947268);
 	    });

 	    it ("Trajectory at time moment 5", function(){
			dt2 = 5;
            bullet.angle = 60;
			tankX = 150;
			tankY = 100;
			bullet.bulletSpeed = 6;

			explosion.generateExplosion(dt2, bullet, tankX, tankY, bullet.angle, bullet.angle, false);
			
			expect(bullet.pos[0]).toEqual(122.19750988234321);
			expect(bullet.pos[1]).toEqual(1453.6957081894936);
 	    }); 
});*/
