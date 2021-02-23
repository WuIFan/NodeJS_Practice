const toRegister = require('../models/register_model');
const encryption = require('../models/encryption');
const loginAction = require('../models/login_model');
const verify = require('../models/verification_model')
const updateAction = require('../models/update_model')

const Check = require('../service/member_check');

const config = require('../config/development_config');

const jwt = require('jsonwebtoken');

check = new Check();

module.exports = class Member {
    postRegister(req, res, next) {
        const password = encryption(req.body.password)
        const memberData = {
            name: req.body.name,
            email: req.body.email,
            password: password,
            create_date: onTime()
        }
        toRegister(memberData).then(result => {
            res.json({
                status: "Success",
                result: result 
            })
        }, (err) => {
            res.json({
                result: err
            })
        })
    }
    postLogin(req, res, next) {
        const password = encryption(req.body.password)
        const memberData = {
            email: req.body.email,
            password: password,
        }

        loginAction(memberData).then(rows => {
            if (check.checkNull(rows) === true) {
                res.json({
                    result: {
                        status: "Fail",
                        err: "Error on email or password"
                    }
                })
            } else if (check.checkNull(rows) === false) {
                const token = jwt.sign({
                    algorithm: 'HS256',
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: rows[0].id
                }, config.secret);
                res.setHeader('token', token);
                res.json({
                    result: {
                        status: "Success",
                        loginMember: rows[0].name + " login successfully",
                    }
                })
            }
        })
    }
    putUpdate(req, res, next) {
        const token = req.headers['token'];
        if (check.checkNull(token) === true) {
            res.json({
                err: "Please enter token"
            })
        } else if (check.checkNull(token) === false) {
            verify(token).then(tokenResult => {
                if (tokenResult === false ) {
                    res.json({
                        result: {
                            status: "token error",
                            err: "Please login again"
                        }
                    })
                } else {
                    const id = tokenResult;
                    const password = encryption(req.body.password);

                    const memberUpdateData = {
                        name: req.body.name,
                        password: password,
                        update_date: onTime()
                    }
                    updateAction(id, memberUpdateData).then(result => {
                        res.json({
                            result: result
                        })
                    }, (err) => {
                        res.json({
                            result: err
                        })
                    })
                }
            })
        }
    }
}

const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}