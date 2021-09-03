const express = require('express');
const expresshb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


mongoose.connect('mongodb://localhost:27017/testdb');

const personCollection = new mongoose.Schema({
    email: String, 
    password: String,
    fname: String,
    lname: String
});

const PersonModel = mongoose.model('personCollection', personCollection);

const app = express();

app.engine('handlebars', expresshb());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

const names = [{
    "fname": "Test 1",
    "lname": "Test 2",
}, {
    "fname": "Test 3",
    "lname": "Test 4",
}
]

app.get("/", function (req, res) {

    // const p = new PersonModel({
    //     fname: "test 1",
    //     lname : "test 2"
    // });

    // p.save();
    
    const c = PersonModel.findOne();
    console.log(c);
    res.render("test", {
        message: "Hello World",
        names: names,
        admin: true,
        layout: "main"
    });
});

app.get("/login", function (req, res) {
    res.render("login", {});
});

app.get("/reg", function (req, res) {
    res.render("registration", {});
});

app.post("/loginsubmit", async function (req, res) {


    console.log(req.body.email);
    console.log(req.body.pass);   
    
    const person = await PersonModel.findOne({
        email: req.body.email
    }).exec();

    if (person) {
        console.log("Match found");
        console.log(person.password);
        if (person.password == req.body.pass) {
            console.log("Pass match");
            res.render("test", {});
        } else {
            console.log("Pass mismatch");
            res.render("login", {
                message: "Invalid credentails"
            });
        }
    } else {
        res.render("login", {
            message: "Invalid credentails"
        });        
    }
});

app.post("/regsubmit", async function (req, res) {
    console.log(req.body);
    console.log(req.body.email);
    console.log(req.body.fname);
    console.log(req.body.lname);     
    console.log(req.body.pass);      

    const person = new PersonModel({
        email: req.body.email, 
        password: req.body.pass,
        fname: req.body.fname,
        lname: req.body.lname        
    });

    await person.save();

    res.render("login", {});
});

app.listen(3003);
