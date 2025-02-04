import mongoose, { Schema } from 'mongoose';

export interface IDevKit {
    _id?: string;
    name: string;
    designation: string;
    description: string;
    image: string;
}
const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const devKitSchema = new mongoose.Schema<IDevKit>(
    {
        _id: { type: Schema.Types.ObjectId, auto: true },
        name: { type: String, default: null },
        designation: { type: String, default: null },
        description: { type: String, default: null },
        image: { type: String, default: null },
    },
    opts,
);

export const DevKitModel = mongoose.models?.DevKit || mongoose.model('DevKit', devKitSchema, 'devKit');
