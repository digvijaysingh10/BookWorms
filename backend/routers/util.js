// const mailjs = require('emailjs/email');
const express = require("express")
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage })
router.post('/addimg', upload.single('image'), (req, res) => {
    console.log(req.body);
    res.json({ message: "File upload success" })
})

router.post('/sendmail', (req, res) => {
    data = req.body;
    sendMail(data, (err) => {
        if (err) {
            console.error(err);
            res.json(err)
        }
        else res.json({ message: "success" })
    });
})

const sendMail = (data, callback, username = "pulkitsrivastava13@gmail.com", password = "bzhupefpgspewnnm") => {
    var server = mailjs.server.connect({
        user: username,
        password: password,
        host: "smtp.gmail.com",
        ssl: true

    });

    //send the message and get a callback with an error or details of the messsage that was sent
    server.send({
        text: data.message,
        from: data.from,
        to: data.to,
        cc: "pulkitsrivastava13@gmail.com",
        subject: data.subject
    }, callback);
}

module.exports = router;