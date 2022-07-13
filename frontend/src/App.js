import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './main.css';

function App() {
    const [receiptData, setReceiptData] = useState([
        {
            name: '',
            receiptId: 0,
            price1: 0,
            price2: 0,
        },
    ]);

    const handleChange = ({ target: { name, value } }) =>
        setReceiptData({ [name]: value });

    const handleClick = () => {
        axios
            .post('/createReceipt', receiptData)
            .then(() => axios.get('fetchReceipt', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], {
                    type: 'application/pdf',
                });

                saveAs(pdfBlob, 'newReceipt.pdf');
            });
    };
    return (
        <div className="form">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Name"
                    className="inputField"
                    onChange={handleChange}
                    name="name"
                />
                <label htmlFor="receiptId">Receipt ID</label>
                <input
                    type="number"
                    placeholder="Receipt ID"
                    className="inputField"
                    onChange={handleChange}
                    name="receiptId"
                />
                <label htmlFor="price1">Price 1</label>
                <input
                    type="number"
                    placeholder="Price 1"
                    className="inputField"
                    onChange={handleChange}
                    name="price1"
                />
                <label htmlFor="price2">Price 2</label>
                <input
                    type="number"
                    placeholder="Price 2"
                    className="inputField"
                    onChange={handleChange}
                    name="price2"
                />
                <button onClick={handleClick} className="btn">
                    Download Receipt
                </button>
            </div>
        </div>
    );
}

export default App;
