// import paper from 'paper';
//
// describe ("Point analysis", function () {
// 		let shotBullet,
// 			groundCoord,
// 			bulletPath,
// 			groundPath,
//             groundPointPath,
//         	intersect,
//         	intersectionPoint,
//             canvas=document.createElement("canvas");
//
//         beforeEach( function() {
//         	paper.setup(canvas);
//
// 	    	shotBullet = {
// 				'x': 20,
// 				'y': 30,
// 				'height': 45,
// 				'width': 7
// 			};
// 			intersectionPoint = {
// 				'x': 20,
// 				'y': 30
// 			}
// 			groundCoord = {
// 				'x1': 20,
// 				'y1': 30,
// 				'x2': 300,
// 				'y2': 10
// 			}
//
// 	    	bulletPath = new paper.Path.Rectangle(
// 	    		shotBullet.x, shotBullet.y, shotBullet.height, shotBullet.width
// 	    	);
//
// 	    	groundPath = new paper.Path(
//                 new paper.Point(groundCoord.x1, groundCoord.y1)
//             );
// 	    	groundPath.add(new paper.Point(groundCoord.x2, groundCoord.y2));
//
// 	    	intersect = bulletPath.getIntersections(groundPath);
//         });
//
// 	    fit ("should be equal X coord", function(){
// 	        expect (intersect[0]._point.x).toEqual(intersectionPoint.x);
// 	    });
//
// 	    fit ("should be equal Y coord", function(){
// 	        expect (intersect[0]._point.y).toEqual(intersectionPoint.y);
// 	    });
// });
