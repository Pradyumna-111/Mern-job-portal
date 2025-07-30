const express = require('express');
const router = express.Router();
const upload = require('./uploadMiddleware');
const {
    applyToJob,
    getUserApplications,
    getAllApplications,
    updateApplicationStatus
} = require('../controllers/applicationController');

// Anyone can apply for a job (with resume upload)
router.post('/apply', upload.single('resume'), applyToJob);

// Anyone can view all applications (including their own)
router.get('/my-applications', getUserApplications);

// Anyone can view all user applications
router.get('/admin/applications', getAllApplications);

// Anyone can update application status
router.patch('/admin/applications/:id', updateApplicationStatus);

module.exports = router;
