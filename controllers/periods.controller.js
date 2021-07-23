const Period = require("../models/period.model");
const Teacher = require("../models/teacher.model");
module.exports = {
    getAllPeriods: async (req, res) => {

        await Period.find({}).populate('teacher').exec(function (err, periods) {
            if (err) {
                return res.status(404).send(err);
            }
            res.status(200).send(periods);
        })

    },
    newPeriod: async (req, res) => {
        const {
            title,
            rank,
            subject,
            teacher,
            duration,
            days,
            time,
            link
        } = req.body;
        const newPeriod = new Period({
            title: title,
            rank: rank,
            subject: subject,
            teacher: teacher,
            duration: duration,
            days: days,
            time: time,
            link: link,
        })
        await newPeriod
            .save()
            .then(() => {
                res.json(newPeriod)
            })
            .catch((error) => res.status(400).send(error));
    },
    getPeriod: async (req, res) => {
        const id = req.params.id;
        await Period.find({ _id: id }).populate('teacher').exec(function (error, periods) {
            if (err) {
                return res.status(404).send(error);
            }
            res.status(200).send(periods);
        })

    },

    removePeriod: async (req, res) => {
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
            Period.deleteOne({
                _id: id
            }, (error, result) => {
                if (error) {
                    res.status(400).send(error)
                }
                res.status(200).send(result);
            })
        })

    },

    updatePeriod: async (req, res) => {
        const { days, time, link } = req.body;
        const id = req.params.id;
        const admin = req.params.admin;
        Teacher.find({ _id: admin }, (error, result) => {
            if (error) {
                res.status(400).send(error);
            }
            if (!result[0].is_admin) {
                return res.status(401).send("Can't access this, it's an only-admin feature")
            }
            Period.findOneAndUpdate({ _id: id }, { days: days, time: time, link: link }, (err, updated) => {
                if (err) {
                    return res.status(400).send(err);
                }
                res.status(202).send(updated);
            })
        })


    }

}