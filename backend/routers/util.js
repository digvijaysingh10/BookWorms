var nodemailer = require('nodemailer');
const config = require('../config');
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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.email,
        pass: config.app_password
    }
});

router.post('/sendmail', (req, res) => {

    const data = req.body;

    const mailOptions = {
        from: config.email,
        to: data.to,
        subject: data.subject,
        text: data.message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json(error);
        } else {
            res.status(200).json({ message: 'mail sent successfully!' });
        }
    });
})


// const sendMail = (data, callback, username = "singhdigvijay703@gmail.com", password = "jvqxoedbaklnjvcp") => {
//   var server = mailjs.server.connect({
//       user: username,
//       password: password,
//       host: "smtp.gmail.com",
//       ssl: true

//   });


module.exports = router;
