const calculateDamageArea = (array, damageX, damageY) => {
    let x1,
        y1,
        x2,
        y2,
        theta,
        distance,
        pointOnCircle,
        pointRealOnCircle = [],
        elementToChangeFrom,
        pointsToReplace,
        pointsOfIntersect = [],
        numberOfElementsToRemove;

    const delta = (Math.PI / 12),
        // setting distanceBetweenDamageSegments static as a distance between points of damaged ground
        distanceBetweenDamageSegments = 30,
        damageRadius = 40;

    pointsToReplace = findDamageLimits(array, damageX, damageY, damageRadius);
    
    pointsToReplace.map((item) => {
        if (item[2] === 'inDamage') {
            pointsOfIntersect.push(item);
        }
    });

    for (let i = 1; i < pointsOfIntersect.length; i++) {
        if (i % 2) {
            x1 = pointsOfIntersect[i - 1][0];
            y1 = pointsOfIntersect[i - 1][1];
            x2 = pointsOfIntersect[i][0];
            y2 = pointsOfIntersect[i][1];

            pointRealOnCircle.push([x1, y1]);

            theta = findInitialAngle(pointRealOnCircle[pointRealOnCircle.length - 1][0], pointRealOnCircle[pointRealOnCircle.length - 1][1], damageX, damageY);

            do {
                if (pointOnCircle) {
                    pointRealOnCircle.push(pointOnCircle);
                }

                theta -= delta;

                pointOnCircle = rotateFixed(damageX, damageY, damageRadius, theta);

                distance = calculateDistance(pointOnCircle[0], pointOnCircle[1], x2, y2);
            }
            while (distance > distanceBetweenDamageSegments);

            pointRealOnCircle.push([x2, y2]);
        }
    }

    // replace damage points in pointsToReplace array with extended damage points
    pointsToReplace.splice(1, pointsToReplace.length-2);
    pointRealOnCircle.map((item, i) => {
        pointsToReplace.splice((1 + i), 0, item);
    });

    // insert damage points into originalPoints array with extended damage points
    elementToChangeFrom = pointsToReplace[0][2];
    numberOfElementsToRemove = (pointsToReplace[pointsToReplace.length - 1][2]) - elementToChangeFrom + 1;

    array.splice(elementToChangeFrom, numberOfElementsToRemove);
    // removing property of '1' from array points
    pointsToReplace[0].pop();
    pointsToReplace[pointsToReplace.length - 1].pop();

    pointsToReplace.map((item) => {
        array.splice(elementToChangeFrom, 0, item);
        elementToChangeFrom++;
    });

    return array;
};

const findOriginalPointsToReplace = (array, damageX, damageY, damageRadius) => {
    let segmentPairPoints = [],
        distance,
        elementOfLast,
        pointsOfDamageCenterSegment,
        distanceFromDamageCenter1,
        distanceFromDamageCenter2;

    pointsOfDamageCenterSegment = findSegmentOfPoint(array, damageX, damageY);

    distanceFromDamageCenter1 = calculateDistance(damageX, damageY, pointsOfDamageCenterSegment[0][0], pointsOfDamageCenterSegment[0][1]);
    distanceFromDamageCenter2 = calculateDistance(damageX, damageY, pointsOfDamageCenterSegment[1][0], pointsOfDamageCenterSegment[1][1]);

    if (distanceFromDamageCenter1 >= damageRadius && damageRadius <= distanceFromDamageCenter2) {
        segmentPairPoints.push(pointsOfDamageCenterSegment[0]);
        segmentPairPoints.push(pointsOfDamageCenterSegment[1]);

    } else {
        for (let i = 1; i < array.length; i++) {
            distance = calculateDistance(damageX, damageY, array[i][0], array[i][1]);
            if (distance < damageRadius) {
                segmentPairPoints.push([array[i - 1][0], array[i - 1][1], (i - 1)]);
                segmentPairPoints.push([array[i][0], array[i][1], i]);
            }
        }

        segmentPairPoints.sort((a, b) => {
            if (a[2] > b[2]) {
                return 1;
            }

            if (a[2] < b[2]) {
                return -1;
            }

            return 0;
        });

        // removing duplicated coordinates
        for (let i = 1; i < segmentPairPoints.length; i++) {
            if (segmentPairPoints[i][2] === segmentPairPoints[i - 1][2]) {
                segmentPairPoints.splice(i, 1);
            }
        }

        // number of last point of damaged line-segment in canvas array
        elementOfLast = segmentPairPoints[segmentPairPoints.length - 1][2] + 1;
        segmentPairPoints.push(array[elementOfLast]);
        // also setting index number from originalPoints array
        segmentPairPoints[segmentPairPoints.length - 1].push(elementOfLast);
    }

    return segmentPairPoints;
};

const findDamageLimits = (array, damageX, damageY, damageRadius) => {
    let pointsOnDamageLine = [],
        pointsToReplace = [],
        segmentPairPoints,
        xPrev,
        yPrev,
        xCurr,
        yCurr,
        intersectPt1,
        intersectPt1X,
        intersectPt1Y,
        intersectPt2,
        intersectPt2X,
        intersectPt2Y;

    segmentPairPoints = findOriginalPointsToReplace(array, damageX, damageY, damageRadius);

    // populating array pointsToReplace with points of area which is going to be modified
    pointsToReplace.push(segmentPairPoints[0]);
    for (let i = 1; i < segmentPairPoints.length; i++) {
        xPrev = segmentPairPoints[i - 1][0];
        yPrev = segmentPairPoints[i - 1][1];
        xCurr = segmentPairPoints[i][0];
        yCurr = segmentPairPoints[i][1];

        pointsOnDamageLine = findIntersectionCoordinates(xPrev, yPrev, xCurr, yCurr, damageX, damageY, damageRadius);
        intersectPt1 = pointsOnDamageLine[0];
        intersectPt2 = pointsOnDamageLine[1];
        intersectPt1X = intersectPt1[0];
        intersectPt1Y = intersectPt1[1];
        intersectPt2X = intersectPt2[0];
        intersectPt2Y = intersectPt2[1];

        setPointOrder(xPrev, yPrev, xCurr, yCurr, intersectPt1X, intersectPt1Y, intersectPt2X, intersectPt2Y, pointsToReplace);
    }

    pointsToReplace.push(segmentPairPoints[segmentPairPoints.length - 1]);

    return pointsToReplace;
};

// helper-functions

const markAndPushPoint = (point, arrayInOrder) => {
    point.push('inDamage');
    arrayInOrder.push(point);
};

const setPointOrder = (endpoint1X, endpoint1Y, endpoint2X, endpoint2Y, damagePoint1X, damagePoint1Y, damagePoint2X, damagePoint2Y, arrayOfOrder) => {
    // compare and set order of two damagePoint's T's coefficients of two points, situated on the same line segment
    let damagePoint1T,
        damagePoint2T,
        initialCheck1,
        initialCheck2,
        initialCheck3,
        initialCheck4;

    const damagePoint1 = [damagePoint1X, damagePoint1Y],
        damagePoint2 = [damagePoint2X, damagePoint2Y];

    damagePoint1T = findLineSegmentCoefficient(endpoint1X, endpoint1Y, endpoint2X, endpoint2Y, damagePoint1X, damagePoint1Y);
    damagePoint2T = findLineSegmentCoefficient(endpoint1X, endpoint1Y, endpoint2X, endpoint2Y, damagePoint2X, damagePoint2Y);

    initialCheck1 = (damagePoint1X < damagePoint2X);
    initialCheck2 = (damagePoint1X > damagePoint2X);
    initialCheck3 = ( (damagePoint1X === damagePoint2X) && (damagePoint1Y > damagePoint2Y) );
    initialCheck4 = ( (damagePoint1X === damagePoint2X) && (damagePoint1Y < damagePoint2Y) );

    if ( (damagePoint1T && damagePoint2T) && (initialCheck1 || initialCheck3) ) {
        markAndPushPoint(damagePoint1, arrayOfOrder);
        markAndPushPoint(damagePoint2, arrayOfOrder);
    } else if (!damagePoint1T && damagePoint2T) {
        markAndPushPoint(damagePoint2, arrayOfOrder);
    } else if (damagePoint1T && !damagePoint2T) {
        markAndPushPoint(damagePoint1, arrayOfOrder);
    } else if ( (damagePoint1T && damagePoint2T) && (initialCheck2 || initialCheck4) ) {
        markAndPushPoint(damagePoint2, arrayOfOrder);
        markAndPushPoint(damagePoint1, arrayOfOrder);
    }
};

const findLineSegmentCoefficient = (endpoint1X, endpoint1Y, endpoint2X, endpoint2Y, damagePointX, damagePointY) => {
    // find coefficient of point, situated on line segment
    let conditionX,
        conditionY,
        conditionEqual;

    const deltaX = (endpoint2X - endpoint1X);
    const deltaY = (endpoint2Y - endpoint1Y);

    const tX = Math.ceil( ( (damagePointX - endpoint1X) / deltaX ) * 10 ) / 10;
    const tY = Math.ceil( ( (damagePointY - endpoint1Y) / deltaY ) * 10 ) / 10;

    conditionX = ( 0 < tX && tX <= 1);
    conditionY = ( 0 < tY && tY <= 1);
    conditionEqual = (tX === tY);

    return (conditionX && conditionY && conditionEqual);
};

const findIntersectionCoordinates = (x1, y1, x2, y2, cX, cY, r) => {
    /* x1, y1 and x2, y2 - are coordinates of line-segment on canvas
     * cX, cY and r - are coordinates of center of damage and a radius */

    /* using line equation (y = m*x + k) */
    const m = ( (y2 - y1) / (x2 - x1) );
    const k = (y1 - m * x1);

    /* using circle equation (a*x^2 + b*x + c = 0) */
    const a = (Math.pow(m, 2) + 1);
    const b = 2 * (m * k - m * cY - cX);
    const c = ( Math.pow(cY, 2) - Math.pow(r, 2) + Math.pow(cX, 2) - 2 * k * cY + Math.pow(k, 2) );

    const xPlus = ( ( -b + ( Math.sqrt( (Math.pow(b, 2)) -4 * a * c ) ) ) / (2 * a) );
    const xMinus = ( ( -b - ( Math.sqrt( (Math.pow(b, 2)) -4 * a * c ) ) ) / (2 * a) );

    /* using line equation again to calculate two variants of y */
    const yPlus = (m * xPlus + k);
    const yMinus = (m * xMinus + k);

    const point1 = [Math.round(xPlus), Math.round(yPlus)];
    const point2 = [Math.round(xMinus), Math.round(yMinus)];

    return [point1, point2];
};

const findInitialAngle = (x, y, cx, cy) => {
    // warning! in canvas positive x goes to the right but positive y goes to the bottom!
    return Math.atan2((y - cy), (x - cx));
};

const rotateFixed = (cx, cy, r, theta) => {
    const pX = Math.round( cx + (r * Math.cos(theta)) );
    const pY = Math.round( cy + (r * Math.sin(theta)) );

    return [pX, pY];
};

const findSegmentOfPoint = (array, damageX, damageY) => {
    /*returns endpoints of line segment (of battlefield on canvas) of point which belongs to it*/
    let x1,
        y1,
        x2,
        y2,
        ptCoeff;

    for (let i = 1; i <= array.length - 1; i++) {
        x1 = array[i - 1][0];
        y1 = array[i - 1][1];
        x2 = array[i][0];
        y2 = array[i][1];

        if (x1 === damageX && y1 === damageY) {
            if (array[i - 2] !== undefined) {
                const point1 = [array[i - 2][0], array[i - 2][1], (i - 2)];
                const point2 = [x2, y2, i];

            } else {
                const point1 = [array[array.length - 1][0], array[array.length - 1][1], (array.length - 1)];
                const point2 = [x2, y2, i];
            }

            return [point1, point2];
        }

        if (x2 >= damageX) {
            ptCoeff = findLineSegmentCoefficient(x1, y1, x2, y2, damageX, damageY);
            if (ptCoeff) {
                const point1 = [x1, y1, (i - 1)];
                const point2 = [x2, y2, i];

                return [point1, point2];

            } else {
                x1 = x2;
                y1 = y2;
                x2 = array[i + 1][0];
                y2 = array[i + 1][1];

                ptCoeff = findLineSegmentCoefficient(x1, y1, x2, y2, damageX, damageY);

                if (ptCoeff) {
                    const point1 = [x1, y1, i];
                    const point2 = [x2, y2, (i + 1)];

                    return [point1, point2];
                }
            }
        }
    }

    return null;
};

const calculateDistance = (x1, y1, x2, y2) => {
    /*check distance between two points coordinates*/
    return ( (Math.sqrt( Math.pow( (x2 - x1), 2 ) + ( Math.pow( (y2 - y1), 2 ) ) )) );
};