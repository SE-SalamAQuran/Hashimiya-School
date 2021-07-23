const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config({});
const secretKey = process.env.JWT_SECRET;
module.exports = {
    getAllStudents: async (req, res) => {
        Student.find({}, (err, students) => {
            if (err) {
                res.status(404).send(err);
            }
            res.status(200).send(students);
        });
    },
    registerNewStudent: async (req, res) => {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
                res.status(400).send(err);
            } else {
                const newStudent = new Student({
                    name: req.body.name,
                    parentsPhone: req.body.parentsPhone,
                    email: req.body.email,
                    password: hash,
                    address: req.body.address,
                    grade: req.body.grade,
                    section: req.body.section,
                    dateOfBirth: req.body.dateOfBirth,
                    gpa: req.body.gpa,
                });

                await newStudent
                    .save()
                    .then(() => res.json(newStudent))
                    .catch((error) => res.status(400).send(error));
            }
        });
    },

    studentLogin: (req, res) => {
        var loginType;
        if (req.body.emailPhone != "" && req.body.password != "") {
            if (isNaN(req.body.emailPhone)) loginType = "email";
            else loginType = "phoneNo";
            Student.findOne()
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
                                        user_type: "student"
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
    getStudent: async (req, res) => {
        const id = req.params.id;
        Student.find({
            _id: id
        }, (err, student) => {
            if (err) {
                res.status(404).json({
                    Error: err,
                    Message: "Student not found",
                })
            } else
                res.status(200).send(student);
        })
    },

    removeStudent: async (req, res) => {
        const id = req.params.id;
        const admin_id = req.params.admin;
        //Check whether the user is a teacher or not
        await Teacher.find({
            _id: id
        }, (err, teacher) => {

            //If found then check if admin
            if (err || !teacher.is_admin) {
                return res.status(401).send("Unauthorized Access to admin feature");
            }
            //remove the period
            Student.deleteOne({
                _id: id
            }, (error, result) => {
                if (error) {
                    res.status(400).send(error)
                }
                res.status(200).send(result);
            })
        })

    },

    updateStudent: (req, res) => {
        const { parentsPhone, address, email, section } = req.body;
        const id = req.params.id;
        const admin = req.params.admin;
        Teacher.find({ _id: admin }, (error, result) => {
            if (error) {
                res.status(400).send(error);
            }
            if (!result[0].is_admin) {

                return res.status(401).send("Can't access this, it's an only-admin feature")
            }
            Student.findOneAndUpdate({ _id: id }, {
                parentsPhone: parentsPhone,
                address: address,
                email: email,
                section: section

            },
                (err, updated) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    res.status(202).send(updated);
                })

        })

    },

    //Increase Grades for all students each year automatically

    updateGrades: async (req, res) => {

        await Student.updateMany({}, { $inc: { grade: +1 } }, (err, updated) => {
            if (err) {
                res.status(500).json({
                    Message: "Failed to update student records",
                    Error: err
                })
            }
            res.status(200).send("Updated Grades Successfully");
        })
    },
    graduateStudents: async (req, res) => {
        await Student.updateMany({})
            .where("grade")
            .gt(12)
            .exec((err, result) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(result);
            })
    }

}