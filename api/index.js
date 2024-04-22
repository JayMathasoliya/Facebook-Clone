const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
const path = require("path");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Successfully....");
});

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use("/images", express.static(path.join(__dirname, "public/images")));

const storageForPost = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const uploadForPost = multer({ storage: storageForPost });

const storageForProfile = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/person");
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})

const uploadForProfile = multer({ storage: storageForProfile });

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);


app.post("/api/upload", uploadForPost.single("file"), (req, res) => {
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (err) {
        console.error(err);
    }
})

app.post("/api/uploadProfile", uploadForProfile.single("file"), (req,res)=>{
    try {
        return res.status(200).json("File Uploaded Successfully")
    } catch (err) {
        console.error(err);
    }
})

app.listen(8800, () => {
    console.log("Server is running on port 8800");
})