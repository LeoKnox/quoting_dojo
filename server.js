var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

app.use(express.static(path.join(__dirname, './views')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var QuoteSchema = new mongoose.Schema({
    name: {type:String, require:true, minlength:2},
    quote: {type:String, require:true, minlength:2}
}, {timestamps: true});
mongoose.model('Quote', QuoteSchema);
var Quo = mongoose.model('Quote');

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/quotes', function(req, res) {
    var info = {};
    Quo.find({}, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info[0].name);
            res.render('quote', {data: info});
        }
    })
})

app.post('/quotes', function(req, res) {
    console.log(req.body.name);
    var newname = req.body.name;
    var newquote = req.body.quote;
    var newobj = new Quo ({name: newname, quote:newquote});
    var info = {};
    newobj.save(function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('ok');
        };
    });
    res.redirect('/quotes');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})