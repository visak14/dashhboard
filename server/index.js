const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { DataModel, Admin } = require('./db/index');
const dotenv = require('dotenv');
const { authenticateJwt, SECRET } = require("./middleware/auth");
const { z } = require('zod');
const jwt = require('jsonwebtoken');

dotenv.config();

const port = process.env.PORT || 3000;
const uri = process.env.URI;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(uri, { dbName: 'mern_intern', useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        
        // Start the server only after connecting to MongoDB
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });

        // File reading and data insertion
        const jsonFilePath = path.join(__dirname, 'jsondata.json');
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }

            const jsonData = JSON.parse(data);
            DataModel.insertMany(jsonData)
                .then(() => {
                    console.log('Data inserted successfully');
                })
                .catch(err => {
                    console.error('Error inserting data:', err);
                });
        });
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB:', err);
    });

// API route
app.post('/api/data',  async (req, res) => {
    console.log('POST /api/data route hit');
    try {
        const data = await DataModel.find();
        res.json(data);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: err.message });
    }
});

// Signup route
let usernameInputProps = z.object({
    username: z.string().min(1).email(),
    password: z.string().min(1)
});

app.post('/signup', async (req, res) => {
    const parsedInput = usernameInputProps.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(400).json({
            msg: parsedInput.error
        });
    }

    const { username, password } = parsedInput.data;

    try {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(403).json({ message: 'Admin already exists' });
        }

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
        res.json({ message: 'Admin created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get("/me", authenticateJwt,  async (req, res) => {
    const admin = await Admin.findOne({ username: req.user.username });
    if (!admin) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        username: admin.username
    })
  });

module.exports = app;
