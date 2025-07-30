const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const { title, company, location, description, salary } = req.body;

        // Basic validation
        if (!title || !company || !location || !description) {
            return res.status(400).json({ message: 'Title, company, location, and description are required' });
        }

        // postedBy is null as no auth expected
        const job = new Job({
            title,
            company,
            location,
            description,
            salary: salary || '', // default empty string if not provided
            postedBy: null,
        });

        await job.save();

        res.status(201).json({ message: 'Job created successfully', job });
    } catch (error) {
        console.error('CreateJob Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getJobs = async (req, res) => {
    try {
        // Add optional query parameters for filtering if needed in future
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        console.error('GetJobs Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid job ID format' });
        }

        const job = await Job.findByIdAndDelete(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        console.error('DeleteJob Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
