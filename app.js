require('./database/db')

//for user
const User = require('./model/User')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const path = require('path')

app.set('views', 'views');
app.set('view engine', 'html')
app.use(express.static('views'));

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post("/signup", (req, res) => {
    // console.log(req.body.name + " " + req.body.password)
    var data = new User({
        name: req.body.name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password
    });
    console.log(data);

    // data.save().then(function() {
    //     res.send('data inserted')
    // }).catch(function() {
    //     res.send('failed');
    // })
});

app.post("/chkLogin", (req, res) => {
    User.find({
        username: req.body.email,
        password: req.body.password
    }).then(function(item) {
        var user = JSON.stringify(item)
        console.log(user)
        res.redirect('/home');
        console.log(req.body.username)
    }).catch(function(e) {
        res.send(e)
    })
});

app.post("/getUser", (req, res) => {
    User.find({
        username: req.body.email,
        password: req.body.password
    }).then(function(item) {
        var user = JSON.stringify(item)
        console.log(user)
        res.send(user);
        console.log(req.body.username)
    }).catch(function(e) {
        res.send(e)
    })
});

app.listen(8080);