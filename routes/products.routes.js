const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

//endpoint 1 - get all documents - tested
router.get('/products', (req, res) => {
  req.db.collection('products').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data); 
  });
});

//endpoint 2 - get random document - tested
router.get('/products/random', (req, res) => {
  req.db.collection('products').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

//endpoint 3 - get document by id - tested
router.get('/products/:id', (req, res) => {
  req.db.collection('products').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

//endpoint 4 - add new document - tested
router.post('/products', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').insertOne({ name, client }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});

//endpoint 5 - edit document - tested
router.put('/products/:id', (req, res) => {
  const { name, client } = req.body;
  req.db.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: { name, client }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

//endpoint 6 - delete document - tested
router.delete('/products/:id', (req, res) => {
  req.db.collection('products').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

module.exports = router;
