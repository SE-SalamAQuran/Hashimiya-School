const Alert = require("../models/alert.model");
const Teacher = require("../models/teacher.model");

module.exports = {
    fetchAlerts: async (req, res) => {
        await Alert.find({})
            .populate("student")
            .exec(function (err, alerts) {
                if (err) {
                    return res.status(404).send(err);
                }
                res.status(200).send(alerts);
            });
    },
    getStudentAlerts: async (req, res) => {
        const student = req.params.id;
        await Alert.find({ student: student }, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            res.status(200).send(result);
        });
    },
    newAlert: async (req, res) => {
        const { title, alertClass, student, cause } = req.body;
        const newAlert = new Alert({
            title: title,
            alertClass: alertClass,
            student: student,
            cause: cause,
        });

        await newAlert
            .save()
            .then(() => {
                res.json(newAlert);
            })
            .catch((error) => {
                res.status(400).send(error);
            });
    },
    getGradeAlerts: async (req, res) => {
        const grade = req.params.grade;
        const section = req.params.section;

        Alert.find({})
            .populate("student")
            .where("student.grade")
            .equals(grade)
            .where("student.section")
            .equals("section")
            .exec((err, result) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.status(200).send(result);
            });
    },
    deleteAlert: async (req, res) => {
        const id = req.params.id;
        const admin_id = req.params.admin;
        //Check whether the user is a teacher or not
        await Teacher.find({
            _id: admin_id
        }, (err, teacher) => {

            //If found then check if admin
            if (err) {
                return res.status(400).send(err);
            }
            if (teacher.is_admin === false) {
                return res.status(401).send("Unauthorized Access to admin feature");
            }
            //remove the alert
            Alert.deleteOne({
                _id: id
            }, (error, result) => {
                if (error) {
                    res.status(400).send(error)
                }
                res.status(200).send(result);
            })
        })
    }
};
