const Application = require('../models/Application');

// Apply to a job - expects userId and jobId in body directly (no req.user)
exports.applyToJob = async (req, res) => {
    try {
        const { userId, jobId } = req.body; // user must send userId explicitly
        const resumeFile = req.file;

        if (!userId || !jobId) {
            return res.status(400).json({ message: 'Missing userId or jobId' });
        }

        const exists = await Application.findOne({ user: userId, job: jobId });
        if (exists) return res.status(400).json({ message: 'Already applied' });

        const resumeUrl = resumeFile ? `/uploads/resumes/${resumeFile.filename}` : '';

        const application = new Application({
            user: userId,
            job: jobId,
            resumeUrl,
            status: 'Applied'
        });

        await application.save();

        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get applications for a user by userId query parameter (no req.user)
exports.getUserApplications = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) return res.status(400).json({ message: 'Missing userId query parameter' });

        // Populate job info for displaying on frontend
        const applications = await Application.find({ user: userId }).populate('job');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: View all applications with user & job details
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate('user', 'name email')
            .populate('job', 'title company location');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin: Update application status (accept/reject)
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params; // application id
        const { status } = req.body; // 'Accepted' or 'Rejected'

        if (!['Accepted', 'Rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )
            .populate('user', 'name email')
            .populate('job', 'title company');

        if (!application) return res.status(404).json({ message: 'Application not found' });

        res.json({ message: 'Status updated', application });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
