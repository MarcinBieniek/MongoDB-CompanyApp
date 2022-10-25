const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;

// endpoint 1 - get all - tested
router.get('/employees', (req, res) => {
  req.db.collection('employees').find().toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data); 
  });
});

// endpoint 2 - random - tested
router.get('/employees/random', (req, res) => {
  req.db.collection('employees').aggregate([ { $sample: { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

//endpoint 3 - get document by id - tested
router.get('/employees/:id', (req, res) => {
  req.db.collection('employees').findOne({ _id: ObjectId(req.params.id) }, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not found' });
    else res.json(data);
  });
});

//endpoint 4 - post new element - tested
router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').insertOne({ firstName, lastName }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});

//endpoint 5 - edit document - tested
router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  req.db.collection('employees').updateOne({ _id: ObjectId(req.params.id) }, { $set: { firstName, lastName }}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

//endpoint 6 - delete document - tested
router.delete('/employees/:id', (req, res) => {
  req.db.collection('employees').deleteOne({ _id: ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

module.exports = router;
