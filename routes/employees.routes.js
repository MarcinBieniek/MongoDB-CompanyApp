const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/employees.controller');

router.get('/employees', EmployeeController.getAll);
router.get('/employees/random', EmployeeController.getAll);
router.get('/employees/:id', EmployeeController.getById);
router.post('/employees', EmployeeController.postDoc);
router.put('/employees/:id', EmployeeController.putDoc);
router.delete('/employees/:id', EmployeeController.deleteDoc);

module.exports = router;
