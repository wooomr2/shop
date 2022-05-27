const mongoose = require('mongoose');
const screenSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banners: [
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    cards: [
        {
            img: { type: String },
            navigateTo: { type: String }
        }
    ],
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


module.exports = mongoose.model('Screen', screenSchema);