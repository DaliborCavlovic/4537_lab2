const { response, urlencoded } = require("express");
const express = require("express");
const bodyParser = require("body-parser");

var cors = require("cors");

const app = express();
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello!");
})

app.post("/chatbot", (req, res) => {
    console.log(req.body);
    const message = req.body.message;
    const number = message.match(/\d+/);
    console.log("Number: " + number)
    if (number) {
        fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
            res.json({
                text: data
            });
        }).catch(error => {
            res.json({
                text: "Sorry I couldn't find any information about that number"
            });
        });
    } else {
        res.json({
            text: "Sorry, I didn't understand your question. Please provide a number for me to give information about."
        });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
