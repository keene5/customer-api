const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4000; // Choose a port for your server

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Dummy data for demonstration
let items = [
    {
        "id": 0,
        "name": "Mike Johnsons",
        "email": "mikej@abc.com",
        "password": "mikej"
    },
    {
        "name": "Cindy Smiths",
        "email": "cinds@abc.com",
        "password": "cinds",
        "id": 1
    },
    {
        "name": "Julio Martins",
        "email": "julim@abc.com",
        "password": "julim",
        "id": 2
    }
]

// Utility function to generate a new unique ID
const generateId = () => {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 0;
};

// GET method
app.get('/api/data', (req, res) => {
    res.json(items);
});

// POST method
app.post('/api/data', (req, res) => {
    const newData = req.body;
    newData.id = generateId(); // Assign a new unique ID
    items.push(newData);
    res.status(201).json(newData);
});

// PUT method

app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedData = req.body;
    const index = items.findIndex(item => item.id === id);
  
    if (index !== -1) {
      items[index] = updatedData;
      res.json(updatedData);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  });

// DELETE method
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = items.findIndex(item => item.id === id);

    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});