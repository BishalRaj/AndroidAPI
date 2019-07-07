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
const Chart = require('./model/chart')
var auth = require('./middleware/auth')

app.set('views', 'views');
app.set('view engine', 'html')
app.use(express.static('views'));

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use("/images", express.static("images"))


// var os = require( 'os' );

// var networkInterfaces = os.networkInterfaces( );

// console.log( networkInterfaces );


var ip = require("ip");
console.log(ip.address());

// var navigator = require("navigator")
// var geolocation=require("")
// navigator.geolocation.getCurrentPosition(function(position) {
//     console.log(position)
// });

//signup
app.post("/signup", (req, res) => {
    // console.log(req.body.name + " " + req.body.password)
    var data = new User({
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        country: req.body.country,
        userType: 'user',
        image: 'default.jpg',
        status: 'active',
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
app.put("/updateuser", (req, res) => {

    console.log(req.body)
    User.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => { //find by id and update it
        if (!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

});

app.put("/updatechart", (req, res) => {

    console.log(req.body)
    Chart.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, doc) => { //find by id and update it
        if (!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

});

app.put("/updatepost", (req, res) => {

    console.log(req.body)
    Post.findOneAndUpdate({ userId: req.body.id }, req.body, { new: true }, (err, doc) => { //find by id and update it
        if (!err) {
            res.send(true);
        } else {
            res.send(false);
        }
    });

});

app.delete("/deleteuser", (req, res) => {
    console.log(req.body.id)
    User.findByIdAndDelete({ _id: req.body.id }, function(err, doc) {
        if (err) {
            console.log("error")
            res.send(false)
        } else {
            console.log("success")
            res.send(true)
        }

    })
})


app.delete("/deletepost", (req, res) => {
    console.log(req.body.id)
    Post.findByIdAndDelete({ _id: req.body.id }, function(err, doc) {
        if (err) {
            console.log("error")
            res.send(false)
        } else {
            console.log("success")
            res.send(true)
        }

    })
})


app.get('/checking/auth', auth, function(req, res) {
    res.send(req.user)
    console.log(req.user)
})


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
        'country': user.country,
        'image': user.image
    });
});


app.get("/getUser/:id", (req, res) => {
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

app.get("/getPostImageById/:userId", (req, res) => {
    const uid = req.params.userId;
    var sortById = { _id: -1 }
    Post.find({
        userId: uid
    }).sort(sortById).then(function(image) {
        res.send(image);
        console.log(image);
    }).catch(function(e) {
        res.send(e)
    })
});

app.post("/getPostImage", (req, res) => {

    const uid = req.body.userId;
    var sortById = { _id: -1 }
    Post.find({
        userId: uid
    }).sort(sortById).then(function(image) {
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
    // console.log("hello" + TotalI
    console.log('uplado request receuved')
    res.end(JSON.stringify({
        TotalImage
    }))
});


//adding post
app.post("/addPost", (req, res) => {

    var userId = req.body.userId;
    console.log("abc: " + req.body.userId);
    var post = req.body.post;
    var imageinit = req.body.imageName;
    if (imageinit == "") {
        var image = "default.jpg";
    } else {
        var image = imageinit;
    }
    var username = req.body.username;
    var location = req.body.location;
    var userImage = req.body.userImage;
    console.log(post)


    var data = new Post({
        userId: userId,
        post: post,
        image: image,
        username: username,
        location: location,
        userImage: userImage
    });

    console.log(data);

    data.save().then(function() {
        res.send(true)
            // uploadImage.single('files');
    }).catch(function() {
        res.send('notDone');
    })
});

app.post("/addChart", (req, res) => {
    var chart = req.body.chart;
    var privacy = req.body.privacy;
    var date = req.body.date;
    var data = new Chart({
        chart: chart,
        privacy: privacy,
        date: date
    })
    data.save().then(function() {
        res.send(true)
    }).catch(function() {
        res.send('notDone');
    })
})

app.get("/getChart", (req, res) => {
    var sortById = { _id: -1 }
    Chart.find().sort(sortById).then(function(post) {
        console.log(post)
        res.send(post);
    }).catch(function(e) {
        res.send(e)
    })
});

// get post

app.get("/getPost", (req, res) => {
    var sortById = { _id: -1 }

    Post.find().sort(sortById).then(function(post) {
        console.log(post)
        res.send(post);
    }).catch(function(e) {
        res.send(e)
    })
});

app.get("/getPost/:id", (req, res) => {
    const uid = req.body.id;
    // console.log("uid" + uid)
    Post.findById({
        _id: uid
    }).then(function(usr) {
        console.log("user: " + usr.name);
        res.send(usr);
    }).catch(function(e) {
        res.send(e)
    })
});



app.post('/logout', auth, async(req, res) => {
    try {
        console.log("i am at logout")
        req.user.tokens = []
        await req.user.save()
        res.send(true)
    } catch (e) {
        res.status(500).send()
    }
})

//admin le user tannu
app.get('/showuser', function(req, res) {
    var id = req.params.id
    User.find().then(function(user) {
        res.send(user);
        console.log(user);
    }).catch(function() {
        console.log('errot');
    })
});






app.listen(8080);