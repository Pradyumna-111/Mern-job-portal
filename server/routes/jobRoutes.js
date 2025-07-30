const express = require('express');
const router = express.Router();
const { createJob, getJobs, deleteJob } = require('../controllers/jobController');

// Anyone can post, get, and delete jobs (NO auth)
router.post('/admin/jobs', createJob);           // Create job
router.get('/jobs', getJobs);                    // Get all jobs
router.delete('/admin/jobs/:id', deleteJob);     // Delete job

module.exports = router;
