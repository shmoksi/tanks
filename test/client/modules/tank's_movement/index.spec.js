// describe ("Test tank's movement", function () {
// 	describe ("Test Y coordinate", function () {
// 		let coord;
// 		beforeEach (function(){
// 			coord = {
// 				"x": 0,
// 				"y": 0
// 			}
// 		})
//
// 		fit ("should be defined", function(){
// 			expect(findLinePoints(coord.x)).toBeDefined();
// 		})
// 	    fit ("should be equal in the beginning", function(){
// 	    	coord = {
// 				"x": 0,
// 				"y": 500
// 			}
// 	        expect(findLinePoints(coord.x)).toEqual(coord.y);
// 	    })
// 	    fit ("should be equal in the middle", function(){
// 	    	coord = {
// 				"x": 400,
// 				"y": 159
// 			}
// 	        expect(findLinePoints(coord.x)).toEqual(coord.y);
// 	    })
// 	    fit ("should be equal in the end", function(){
// 	    	coord = {
// 				"x": 800,
// 				"y": 250
// 			}
// 	        expect (findLinePoints(coord.x)).toEqual(coord.y);
// 	    })
// 	});
//
//     describe ("Test tank's move", function () {
//     	let values = {
//     		'right': 1,
//     		'left': -1
//     	},
//     		time;
//
//     	beforeEach (function() {
//     		tankX = 0;
//     		time = 1;
//     	});
//
// 	    fit ("should be equal in the move right", function(){
// 			draw('right', time, false);
// 	        expect(tankX).toEqual(values.right);
// 	    });
//
// 	    fit ("should be equal in the move left", function(){
// 	        draw('left', time, false);
// 	        expect(tankX).toEqual(values.left);
// 	    });
// 	});
// });
