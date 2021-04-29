const router = require('express').Router();
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


module.exports = router;