const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var express = require('express');
var nodemailer = require('nodemailer');
var fs = require('fs');
var strUserImg = {"image": "cat.jpg", uploadedImg: false};
var path = require('path');
var multer = require('multer');
var fsHelper = require('../libs/fsHelper');

const Schema = mongoose.Schema;
const userScopeName = 'userAvatar';
const publicScopeName = 'public';
const userUploadsScopeName = 'userUploads';
const publicImgURL = "/api/users/profile/getImage/" + publicScopeName + '/';
const userImgURL = '/api/users/profile/getImage/' + userUploadsScopeName + '/';


var userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    userEmail: {type: String, required: true, unique: true},
    userPassword: {type: String, required: true},
    userAge: {type: Number, required: true},
    userImg: {type: Object},
    isOnline: {type: Boolean},
    isEnabled: {type: Boolean}
});

module.exports = mongoose.model('User', userSchema);

const showAll = function (callback) {
    this.find((err, users) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }

        if (!users) {
            return res.status(404).send('Database is empty');
        }

        callback(err, users);
    });
};

const showProfile = function (id, callback) {
    this.findOne(id, function (err, foundUser) {
        if (err) {
            console.log(err);
            return err;
        }

        if (!foundUser) {
            return err;
        }

        callback(err, foundUser);
    });
};

const passHash = (userPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(userPassword, salt, (err, hash) => {
            callback(err, hash);
        });
    });
};

const createUser = function (newUser, callback) {
    newUser.userImg = strUserImg;
    passHash(newUser.userPassword, (err, hash) => {
        if (err) {
            return callback(err);
        }

        newUser.userPassword = hash;
        newUser.save(function (err, user) {
            if (err) {
                return callback(err);
            }
            callback(null, user);
        });
    });
};

const comparePassword = (candPassword, hash, callback) => {
    bcrypt.compare(candPassword, hash, function (err, res) {
        console.log(err, res);
        if (err) throw err;
        callback(null, res);
    });
};

const loginUser = function (username, password, callback) {
    var User = this;
    // linux task manager
    // TODO checking of user.isEnabled
    User.findOne({userName: username}, (err, foundUser) => {
        if (err) {
            callback(err);
        } else if (foundUser) {

            if (foundUser.isEnabled === false) {
                return callback(new Error('Sorry, this user is deleted'));

            } else {
                comparePassword(password, foundUser.userPassword, function (err, res) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send();
                    }

                    if (res) {
                        updateUser(foundUser);
                    }
                });
            }
        } else {
            callback(new Error('User is not found'));
        }
    });

    const updateUser = (foundUser) => {
        User.update({userName: foundUser.userName}, {isOnline: true}, function (err) {
            if (err) {
                console.log('err ', err);
                return res.status(401).send();
            } else {
                var foundUserEnter = {
                    userName: foundUser.userName,
                    userAge: foundUser.userAge,
                    userImg: foundUser.userImg,
                    userEmail: foundUser.userEmail,
                    _id: foundUser._id
                };
                callback(err, foundUserEnter);
            }
        });
    }
};

const logoutUser = function (id, callback) {
    this.findOneAndUpdate(id, {
            $set: {
                isOnline: false
            }
        },
        {upset: true},
        (err, updatedUser) => {
            if (err) {
                console.log('error occured ' + err);
                return res.status(500).send();
            } else {
                callback(err, updatedUser);
            }
        });
};

const checkUser = function (id, callback) {
    console.log('checkUser', id);
    this.findOne(id, (err, foundUser) => {
        // if (err) {
        //     console.log(err);
        //     return err;
        // }
        // if (!foundUser) {
        //     return err;
        // }

        callback(err, foundUser);
    });
};

const updateUser = function (id, updatedData, callback) {
    var User = this;

    User.findOne(id, (err, foundUser) => {
        if (err) {
            callback(err);
        } else if (foundUser) {
            if (updatedData.userOldPassword) {

                comparePassword(updatedData.userOldPassword, foundUser.userPassword, function (err) {
                    if (err) {
                        return callback(new Error('Password is incorrect'));
                    }

                    if (updatedData.userNewPassword !== updatedData.userConfPassword) {
                        return callback(new Error('Confirmed password does not match'));
                    }

                    if (updatedData.userNewPassword == null || undefined) {
                        return callback(new Error('Old password is entered but new password is not set'));
                    }

                    console.log('updatedData ', updatedData);
                    updateUser(updatedData, foundUser, callback);
                });
            } else {
                User.update({
                        userName: foundUser.userName,
                        userAge: foundUser.userAge,
                        userImg: foundUser.userImg
                    }, {
                        userName: updatedData.userName,
                        userAge: updatedData.userAge,
                        userImg: (!updatedData.userImg || !updatedData.userImg.image) ? foundUser.userImg : updatedData.userImg
                    },

                    function (err, foundUser) {
                        callback(err, foundUser);
                    });
            }
        } else {
            callback(new Error('User is not found'));
        }
    });

    const updateUser = (updatedData, foundUser, callback) => {
        passHash(updatedData.userConfPassword, function (err, hash) {
            updatedData.userConfPassword = hash;

            User.update({
                    userPassword: foundUser.userPassword,
                    userName: foundUser.userName,
                    userAge: foundUser.userAge,
                    userImg: foundUser.userImg
                }, {
                    userPassword: updatedData.userConfPassword,
                    userName: updatedData.userName,
                    userAge: updatedData.userAge,
                    userImg: updatedData.userImg
                },

                function (err, foundUser) {
                    callback(err, foundUser);
                });
        });
    };
};

const deleteUser = function (id, callback) {
    this.findOneAndUpdate(id, {
            $set: {
                isEnabled: false,
                isOnline: false
            }
        },
        {upset: true},
        (err, updatedUser) => {
            if (err) {
                console.log('error occured ' + err);
                return res.status(500).send();
            } else {
                updatedUser.isEnabled = false;
                updatedUser.isOnline = false;

                callback(err, updatedUser);
            }
        });
};


const getUserImage = function (req, res) {

    var userId = req.session.user;
    var userImage;
    var userDir;

    this.findOne({_id: userId}, function (err, foundUser) {
        if (err) {
            res.status(401).send();
        }
        cb(err, foundUser);
    });
    function cb(err, foundUser) {
        userImage = foundUser.userImg;
        if (userImage.uploadedImg) {
            userDir = __dirname + '/../../static/usersInfo/' + userId + '/' + userImage.image;
        } else {
            userDir = __dirname + '/../../static/images/' + userImage.image;
        }
        res.sendFile(path.resolve(userDir), function (err) {
            if (err) {
                console.log('err:  ', err);
                res.status(403).end();
            }
        });
    }

};

const getPublicImage = function (req, res) {
    res.sendFile(path.resolve(__dirname + '/../../static/images/' + req.params.imageName), function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
};


const getUserUploadedImage = function (req, res) {
    var userId = req.session.user;
    var imageName = req.params.imageName;
    var imageDir = __dirname + '/../../static/usersInfo/' + userId + '/' + imageName;

    res.sendFile(path.resolve(imageDir), function (err) {
        if (err) {
            console.log('err:  ', err);
            res.status(403).end();
        }
    });
};

const handleEmail = function (name, email) {
    var userEmail = email;
    var userName = name;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'pockettanksmail@gmail.com', // Your email id
            pass: 'somepassword' // Your password
        }

    });
    var text = `Hello ${userName}! Welcome to PocketTanks game!`;

    var mailOptions = {
        from: 'pockettanksmail@gmail.com',
        to: `${userEmail}`,
        subject: 'Pocket Tanks',
        text: text

    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            ;
        } else {
            console.log('Message sent: ' + userEmail);

        }
        ;
    });

};
const uploadImg = function (request, res) {
    var d = new Date();
    var originName;
    var fileNameNew = 'userAvatar' + d.getTime();
    var dir = './src/server/static/usersInfo/' + request.session.user;
    fsHelper.rmDir(dir);
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            originName = file.originalname;

            cb(null, dir);
        },
        filename: function (req, file, cb) {
            cb(null, fileNameNew + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });
    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    upload(request, res, function (err) {
        if (err) {

            ress.json({error_code: 1, err_desc: err});
            return;
        }
        var extension = originName.split('.')[originName.split('.').length - 1];
        res.json({image: userImgURL + fileNameNew + '.' + extension + fsHelper.getSalt(), uploadedImg: true});

    });
};

const getPublicImg = function (req, res) {
    fs.readdir(__dirname + '/../../static/images/' + '/', function (e, files) {
        if (!e && files.length > 0) {
            var images = [];
            for (var file in files) {
                images.push({image: publicImgURL + files[file] + fsHelper.getSalt(), uploadedImg: false});
            }

            var userId = req.session.user;
            const userDir = __dirname + '/../../static/usersInfo/' + userId + '/';

            fs.readdir(userDir, function (e, files) {
                console.log(e, files.length > 0);
                if (!e && files.length > 0)
                    images.push({image: userImgURL + files[0] + fsHelper.getSalt(), uploadedImg: true});
                res.send(200, images);
            });
        }
        else
            res.send(404);
    });

};

module.exports.getPublicImg = getPublicImg;
module.exports.uploadImg = uploadImg;
module.exports.getUserImage = getUserImage;
module.exports.getUserUploadedImage = getUserUploadedImage;
module.exports.getPublicImage = getPublicImage;
module.exports.handleEmail = handleEmail;
module.exports.showAll = showAll;
module.exports.showProfile = showProfile;
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.logoutUser = logoutUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.checkUser = checkUser;
