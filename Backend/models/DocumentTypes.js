const mongoose = require('mongoose');

// Define schema
const documentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    "Document Type": [String] // Field name remains "Document Type" to match the existing schema
});

// Define model and point it to the 'files' collection
const Document = mongoose.model('Document', documentSchema, 'documents');

module.exports = Document;