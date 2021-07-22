let express = require("express"),
    router = express.Router(),
    fs = require("fs"),
    path = require("path");
const { ResumeToken } = require("mongodb");
const { MulterError } = require("multer");
var multer = require("multer");
const Student = require("../models/student.model");
const Teacher = require("../models/teacher.model");
const DIR = "../uploads";

const storage = new multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path.extname(file.originalname));
    },
});

var upload = new multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
        }
    },
});



router.patch("/avatar/student/:id", upload.single("omg"), function (req, res) {
    const id = req.params.id;
    const url = req.protocol + "://" + req.get("host") + "/";

    const profileImg = url + "uploads/" + req.file.filename;
    var err;
    if (err instanceof MulterError || !req.file) {
        res.statusCode(400).send(err);
    }
    if (!req.file) {
        res.status(400).json({
            Error: "File may be empty or corrupted",
            Status: "Failure",
        });
    }
    Student.findOneAndUpdate({ _id: id }, { avatar: profileImg }, (err, result) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(result);
    })


});

router.patch("/avatar/teacher/:id", upload.single("omg"), function (req, res) {
    const id = req.params.id;
    const url = req.protocol + "://" + req.get("host") + "/";

    const profileImg = url + "uploads/" + req.file.filename;
    var err;
    if (err instanceof MulterError || !req.file) {
        res.statusCode(400).send(err);
    }
    if (!req.file) {
        res.status(400).json({
            Error: "File may be empty or corrupted",
            Status: "Failure",
        });
    }
    Teacher.findOneAndUpdate({ _id: id }, { avatar: profileImg }, (err, teacher) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send(teacher);
    })


});

module.exports = router;