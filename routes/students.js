const router = require('express').Router();
const bodyParser = require('body-parser');
const Student = require('../db/models/student');

router.use(bodyParser.json());

router.get('/', async (req, res, next) => {
  try {
    const studentList = await Student.findAll();
    res.send(studentList);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = await Student.findById(id);

    // console.log(`Retreived student id: ${id}`)
    // console.log(`Student obj: ${student}`);

    if (student) {
      res.status(200).send(await student);
    } else {
      res.status(404).send(await "whoops, that student doesn't exist");
    }
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    /**
        const newStudent = await Student.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        });
    **/
    // This is the shortcut for the above commented code
    const newStudent = await Student.create(req.body);

    res.status(201).json(await newStudent);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    let dbStudent = await Student.findById(id);

    let updatedStudent = await dbStudent.update(req.body)

    // if (typeof req.body.firstName === 'string') {
    //   student.firstName = req.body.firstName;
    // } else if (typeof req.body.lastName === 'string') {
    //   student.lastName = req.body.lastName;
    // } else if (typeof req.body.email === 'string') {
    //   student.email = req.body.email;
    // }

    await updatedStudent.save();
    res.status(200).json(updatedStudent)
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    let rmStudent = await Student.findById(req.params.id)

    await rmStudent.destroy();

    res.sendStatus(204)

  } catch (e) {next(e)}
})

module.exports = router;
