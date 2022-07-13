const express = require ('express');
const bodyParser = require ('body-parser');
const pdf = require ('html-pdf');
const cors = require ('cors');
const pdfTemplate = require('./docs/index.js');

const app = express ();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use (bodyParser.json ());
app.use (cors ());

//POST - RECEIPT GENERATION AND FETCHING OF DATA
app.post ('/createReceipt', (req, res) => {
	pdf.create(pdfTemplate(req.data), {}).toFile('result-receipt', (err)=>{
		if(err) {
			return Promise.reject(err);
		}
		return Promise.resolve();
	})
})

//GET - SETHE GENERATED RECEIPT 


app.listen (port, () => {
	console.log (`Server is running on port ${port}`);
}
