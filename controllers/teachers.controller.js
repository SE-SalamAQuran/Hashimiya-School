const Teacher = require("../models/teacher.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({});
const secretKey = process.env.JWT_SECRET;
module.exports = {
    getAllTeachers: async (req, res) => {
        Teacher.find({}, (err, teachers) => {
            if (err) {
                res.status(404).send(err);
            }
            res.status(200).send(teachers);
        });
    },
    registerNewTeacher: async (req, res) => {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const newTeacher = new Teacher({
                    name: req.body.name,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: hash,

                    address: req.body.address,
                    subject: req.body.subject,
                    salary: req.body.salary,
                });

                await newTeacher
                    .save()
                    .then(() => res.json(newTeacher))
                    .catch((error) => res.status(400).send(error));
            }
        });
    },

    teacherLogin: (req, res) => {
        var loginType;
        if (req.body.emailPhone != "" && req.body.password != "") {
            if (isNaN(req.body.emailPhone)) loginType = "email";
            else loginType = "phoneNo";
            Teacher.findOne()
                .where(loginType, req.body.emailPhone)
                .exec((err, data) => {
                    if (err) res.status(400).send(err);
                    //check if user exists
                    else if (data) {
                        bcrypt.compare(
                            //check if password correct
                            req.body.password,
                            data.password,
                            function (error, passMatch) {
                                if (error) res.status(400).send(error);
                                else if (passMatch) {
                                    let jwtData = {
                                        _id: data["_id"],
                                        name: data["name"],
                                        email: data["email"],
                                        isAdmin: data['is_admin'],
                                        user_type: "teacher"
                                    };
                                    var token = jwt.sign({
                                        user: jwtData
                                    }, secretKey);
                                    let decoded = jwt.verify(token, secretKey);
                                    res.status(200).json({
                                        token: token,
                                        decoded: decoded.user,
                                    });
                                } else {
                                    res.status(401).json({
                                        message: "Invalid Credentials1"
                                    });
                                }
                            }
                        );
                    } else res.status(401).json({
                        message: "Invalid Credentials2"
                    });
                });
        } else res.status(400).json({
            message: "Provide all Credentials"
        });
    },
    getTeacher: async (req, res) => {
        const id = req.params.id;
        Teacher.find({
            _id: id
        }, (err, teacher) => {
            if (err) {
                res.status(404).json({
                    Error: err,
                    Message: "Teacher not found",
                })
            } else
                res.status(200).send(teacher);
        })
    },

}