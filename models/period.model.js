var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const periodSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    subject: {
        type: String,
        enum: ["Physics", "English", "Math", "Chemistry", "Biology", "Arabic", "Religion", "Geography", "History", "PE"],
    },
    teacher: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher"
    },
    duration: {
        type: Number,
        required: true,
    },
    days: {
        type: [String],
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"]
    },
    time: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Period", periodSchema);