require('./database/db')

//for user
const User = require('./model/user')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')
const multer = require('multer')
const Post = require('./model/post')

app.set('views', 'views');
app.set('view engine', 'html')
app.use(express.static('views'));

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/images", express.static("images"))

app.post("/signup", (req, res) => {
    // console.log(req.body.name + " " + req.body.password)
    var data = new User({
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        userType: 'user',
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        academics: req.body.academics,
        degree: req.body.degree,
        university: req.body.university,
        aboutMe: req.body.aboutMe
    });
    console.log(data);

    data.save().then(function() {
        res.send(true)
    }).catch(function() {
        res.send(false);
    })
});


//update user info
app.post("/signup", (req, res) => {
    var data = new User({
        id: req.body._id,
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        userType: 'user',
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        academics: req.body.academics,
        degree: req.body.degree,
        university: req.body.university,
        aboutMe: req.body.aboutMe
    });
    console.log(data);

    data.save().then(function() {
        res.send(true)
    }).catch(function() {
        res.send(false);
    })
});


app.post("/chkLogin", async(req, res) => {

    const user = await User.checkCrediantialsDb(req.body.email, req.body.password);
    console.log(req.body);
    // console.log(user.dob);
    const token = await user.generateAuthToken();
    res.send({
        'token': token,
        'id': user._id,
        'name': user.name,
        'dob': user.dob,
        'userType': user.userType,
        'email': user.email,
        'password': user.password,
        'country': user.country
    });
});


app.get("/getUser/:id", (req, res) => {
    console.log('user hitted')
    const uid = req.params.id;
    // console.log("uid" + uid)
    User.findById({
        _id: uid
    }).then(function(usr) {
        console.log("user: " + usr.name);
        res.send(usr);
    }).catch(function(e) {
        res.send(e)
    })
});

app.post("/getPostImage", (req, res) => {

    const uid = req.body.userId;
    Post.find({
        userId: uid
    }).then(function(image) {
        res.send(image);
        console.log(image);
    }).catch(function(e) {
        res.send(e)
    })
});


//insert image
var TotalImage;
var storage = multer.diskStorage({
    destination: 'images',
    filename: function(req, file, callback) {
        const ext = path.extname(file.originalname);
        TotalImage = file.fieldname + Date.now() + ext;
        callback(null, TotalImage);
    }
});

var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|PNG)$/)) {
        return cb(newError("You can upload only image files!!!"), false);
    } else {
        cb(null, true)
    }
}

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: { fileSize: 99999999 }
});
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(TotalImage)

    res.end(JSON.stringify({
        image: TotalImage
    }))
});


//adding post
app.post("/addPost", (req, res) => {

    var userId = req.body.userId;
    console.log("abc: " + req.body.userId);
    var post = req.body.post;
    var image = req.body.imageName;


    var data = new Post({
        userId: userId,
        post: post,
        image: image
    });
    console.log(data);

    data.save().then(function() {
        res.send('ok')
            // uploadImage.single('files');
    }).catch(function() {
        res.send('notDone');
    })
});

// get post

app.get("/getPost", (req, res) => {
    Post.find().then(function(post) {
        console.log(post)
        res.send(post);
    }).catch(function(e) {
        res.send(e)
    })
});




app.listen(8080);