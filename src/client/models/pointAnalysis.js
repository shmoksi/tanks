const checkCol = (current, array) => {
    let startPoint = array[0];
    for (let i = 1; i < array.length; i++) {
        let endPoint = array[i];
        if (current.x > startPoint[0] && current.x < endPoint[0]) {
            if (checkCross(startPoint, endPoint, current)) {
                return true;
            }
        }
        startPoint = array[i];
    }
}

const checkCross = (startPoint, endPoint, currPoint) => {
    let point1 = {
        x: startPoint[0],
        y: startPoint[1]
    };
    let point2 = {
        x: endPoint[0],
        y: endPoint[1]
    };
    let objPoint = {
        x:currPoint.x + currPoint.width,
        y:currPoint.y + currPoint.height
    };

    let a = (point2.y - point1.y) / (point2.x - point1.x);
    let b = point1.y - a * point1.x;

    if(Math.abs(objPoint.y - (a*objPoint.x + b)) < 2) {
        return true;
    }
    return false;
}