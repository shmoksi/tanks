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




const getSalt = function  (){
    return "?salt=" + new Date().getTime();
};

module.exports.rmDir = rmDir;
module.exports.getSalt = getSalt;