const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');
const pdfTemplate = require('./docs/index.js');

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//POST - RECEIPT GENERATION AND FETCHING OF DATA
app.post('/createReceipt', (req, res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject(err));
        }
        res.send(Promise.resolve());
    });
});

// GET - SEND THE GENERATED RECEIPT TO THE CLIENT
app.get('/fetchReceipt', (req, res) => {
    res.sendFile(`${_dirname}/result.pdf`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
