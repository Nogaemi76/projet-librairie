const express = require ("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const userSchema = require("../models/User");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require('express-validator');

//Registration
router.post("/register-user", 
    [
        check('name')
            .not()
            .isEmpty()
            .isLength({ min: 3 })
            .withMessage('Name must be at least 3 characters long'),
        check('email', 'Email is required')
            .not()
            .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
            .not()
            .isEmpty()
            .isLength({ min: 5, MAX: 8 })
    ], 
(req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    }
    else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
            const user = new userSchema({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save().then((response) => {
                res.status(201).json({
                    message: "User successfully created!",
                    result: response
                });
            }).catch(error => {
                res.status(500).json({
                    error: error
                });
            });
        });
    }
});

//login
router.post("/login", (req, res, next) => {
    let getUser;
    console.log("BIMBAMBOUM")
    console.log(req.body)
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "Authentification failed : wrong user"
            });
        }
        console.log("J'ai trouvé mon user")
        console.log(user)
        getUser = user;
        return bcrypt.compare(req.body.password, user.password)
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentification failed : wrong response"
            });
        }
        let jwtToken = jwt.sign({
            email: getUser.email,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "2h"
        });
        res.status(200).json({
          token: jwtToken,
          expiresIn: 7200,
          msg: getUser,
          userId: getUser._id
        });
    })
    .catch(err => {
        res.status(401).json({
            message: "Authentification failed : token problem"
        });
    });
});

//get users
router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if (error) {
            return next (error);
        } else {
            res.status(200).json(response);
        };
    });
});

//get single user
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
    console.log("ICICI ??????")
    userSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        };
    });
});
//findOne() ne fonctionne pas et affiche une erreur
//Parameter "filter" to findOne() must be an object


//update user
router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('User successfully updated');
        };
    });
});

//delete user
router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        });
      }
    });
});

module.exports = router;