import mongoose, { SchemaTypeOptions, SchemaTypes } from "mongoose";

const linkSchema = new mongoose.Schema({
    longLink: {
        type: String,
        required: true,
        trim: true
    },
    nanolink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    uid: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
});

export const Link = mongoose.model('Link',linkSchema);