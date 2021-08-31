const express = require('express');
const expresshb = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testdb');

const personCollection = new mongoose.Schema({
    fname: String, // String is shorthand for {type: String}
    lname: String
});

const PersonModel = mongoose.model('personCollection', personCollection);

const app = express();

app.engine('handlebars', expresshb());
app.set('view engine', 'handlebars');

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

app.listen(3003);
