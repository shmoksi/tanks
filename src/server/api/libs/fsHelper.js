var fs = require('fs');
var nodemailer = require('nodemailer');
var path = require('path');


const rmDir = function (dirPath) {
    var files = fs.readdirSync(dirPath);
    if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
            var filePath = dirPath + '/' + files[i];
            if (fs.statSync(filePath).isFile())
                fs.unlinkSync(filePath);
        }
};

const checkDir = function (dir) {
    fs.access(dir, function (err) {
        if (err) {
            fs.mkdir(dir);
        }
    });

};


const getSalt = function () {
    return "?salt=" + new Date().getTime();
};
module.exports.checkDir = checkDir;
module.exports.rmDir = rmDir;
module.exports.getSalt = getSalt;