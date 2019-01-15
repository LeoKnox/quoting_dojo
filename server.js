var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var UserSchema = new mongoose.Schema({
    name: String, //(type:String, minlength:2) for validation
    age: Number
}) //({timestamp:true})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

app.get('/', function(req, res) {
    res.render('index');
})
app.post('/users', function(req,res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age: req.body.age});
    user.save(function(err) {
        if(err) {
            console.log('something went wrong');
        } else {
            console.log('successfully added a user');
        }
        res.redirect('/');
    })
    //res.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})