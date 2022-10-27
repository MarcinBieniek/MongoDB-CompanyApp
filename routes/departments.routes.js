const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getAll);
router.get('/departments/:id', DepartmentController.getById);
router.post('/departments', DepartmentController.postDoc);
router.put('/departments/:id', DepartmentController.putDoc);
router.delete('/departments/:id', DepartmentController.deleteDoc);

module.exports = router;
