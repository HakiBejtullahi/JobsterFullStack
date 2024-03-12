//==============
//IMPORTS
//==============

const express = require('express');
const testUser = require('../middleware/testUser');

//==============
//Router SETUP
//==============

const router = express.Router();

//==============
//controller imports
//==============
const {
  getAllJobs,
  getJob,
  createJob,
  editJob,
  deleteJob,
  showStats,
} = require('../controllers/jobs');

//==============
//Router SETUP
//==============

router.route('/').post(testUser, createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router
  .route('/:id')
  .get(getJob)
  .patch(testUser, editJob)
  .delete(testUser, deleteJob);

//==============
//EXPORTS
//==============
module.exports = router;
