const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    alertClass: {
        type: String,
        enum: ["Warning", "Alert", "Dismissal"]
    },
    cause: {
        type: String,
        required: true,
    },
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'Student',
    },
    parentsCalled: {
        type: Boolean,

    }

}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);