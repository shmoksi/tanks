/*import tankMovement from '/mnt/pocket-tanks/src/client/models/tankMovement';
import externalVariables from '/mnt/pocket-tanks/src/client/models/externalVariables';
import { tank } from '/mnt/pocket-tanks/src/client/models/tankModel';

const findLinePoints = tankMovement.findLinePoints,
	draw = tankMovement.draw;
let tankX = tank.getCoord().tankX;

describe ("Test tank's movement", function () {
	describe ("Test Y coordinate", function () {
		let coord;

		beforeEach (function(){
			coord = {
				"x": 0,
				"y": 0
			}
		})

		fit ("should be defined", function(){
			expect(findLinePoints(coord.x)).toBeDefined();
		})
	    fit ("should be equal in the beginning", function(){
	    	coord = {
				"x": 0,
				"y": 500
			}
	        expect(findLinePoints(coord.x)).toEqual(coord.y);
	    })
	    fit ("should be equal in the middle", function(){
	    	coord = {
				"x": 400,
				"y": 183
			}
	        expect(findLinePoints(coord.x)).toEqual(coord.y);
	    })
	    fit ("should be equal in the end", function(){
	    	coord = {
				"x": 800,
				"y": 250
			}
	        expect (findLinePoints(coord.x)).toEqual(coord.y);
	    })
	});

    describe ("Test tank's move", function () {
    	let values = {
    		'right': tankX + 1,
    		'left': tankX - 1
    	},
    		time;

    	beforeEach (function() {
    		time = 1;
    	});

	    fit ("should be equal in the move right", function(){
			tankX = draw('right', time, false);
	        expect(tankX).toEqual(values.right);
	    });

	    fit ("should be equal in the move left", function(){
	        tankX = draw('left', time, false);
	        expect(tankX).toEqual(values.left);
	    });
	});
});
*/
