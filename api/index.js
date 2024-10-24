const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');
const app = express();
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, clientOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/api/test', (req, res) => {
    res.json({ body: 'test ok' });
});

app.post('/api/transaction', async (req, res) => {
    try {
        const {name, description, datetime, price} = req.body;
        const transaction = await Transaction.create({name, description, datetime, price});

        res.status(201).json(transaction);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'An error occurred while creating the transaction' });
    }
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// 31415926