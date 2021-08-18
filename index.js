//Imports for server to run
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config({});
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const cors = require("cors");
const morgan = require("morgan");
const cron = require("node-cron");
const request = require("request");
const path = require("path");
const multer = require("multer");
const dirname = require("path").dirname;
const fs = require("fs");
//Importing Routers
const studentRouter = require("./routes/student.routes");
const teacherRouter = require("./routes/teacher.routes");
const periodRouter = require("./routes/period.routes");
const alertRouter = require("./routes/alert.routes");
const uploadRoutes = require("./middleware/upload.avatar");
const studentController = require("./controllers/students.controller");

// DB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const connection = mongoose.connection;
connection.on('open', () => {
    console.log("Connected to DB!");
});

connection.on('error', (err) => {
    console.log(err);
});


//Middleware functions
//CORS to process requests from the react app
app.use(cors());

//Morgan to prompt all requests' results on the console
app.use(morgan("dev"));

//Express to parse JSON data and recieve requests' bodies
app.use(
    express.urlencoded({
        extended: true,
        limit: "150mb",
        parameterLimit: 1000000,
    })
);

app.use(express.json({
    extended: true,
    limit: "150mb"
}));

app.use('/students', studentRouter);
app.use('/teachers', teacherRouter);
app.use('/periods', periodRouter);
app.use('/alerts', alertRouter);
app.use(multer({ dest: "./uploads" }).single("omg"));

app.use("/upload", uploadRoutes);
app.use(express.static(path.join(__dirname, "./uploads")));

cron.schedule("* * * * Sep * ", () => {
    studentController.graduateStudents;
    studentController.updateGrades;
    //Clean student records every September
})
app.get("/uploads/:bin", (req, res) => {
    const bin = req.params.bin;
    res.set("Content-type", "image/jpeg" || "image/png" || "image/jpg");
    var file = "./uploads/" + bin;
    return res.sendFile(file, { root: __dirname });
});

//Server connection
app.listen(port, () => {
    console.log(`Server Up on Port ${port}`);
});