const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const testList = await Test.findAll();

    res.json(testList);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    if (test) {
      res.send(test);
    } else {
      res.status(404).send('Test not found');
    }
  } catch (e) {
    next(e);
  }
});

router.post('/student/:id', async (req, res, next) => {
  try {
    let student = await Student.findById(req.params.id);
    let newTest = await Test.create(req.body);

    newTest.setStudent(student);

    res.status(201).json(newTest);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let test = await Test.findById(req.params.id);
    test.destroy();
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
