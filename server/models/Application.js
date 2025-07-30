const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    resumeUrl: { type: String }, // URL or path of uploaded resume
    status: { type: String, enum: ['Applied', 'Accepted', 'Rejected'], default: 'Applied' },
    appliedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);
