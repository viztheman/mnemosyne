const PAGE_SIZE = 40;

import {Schema, model} from 'mongoose';

interface IThreadCounterDocument {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<IThreadCounterDocument>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const ThreadCounter = model<IThreadCounterDocument>('ThreadCounter', counterSchema);

interface IThread {
	_id?: number;
	parent: number;
	parentType: string;
	title: string;
	postedBy: number;
	lastPostBy: number;
}

const schema = new Schema<IThread>({
	_id: Number,
	parent: {type: Number, required: true, refPath: 'parentType'},
	parentType: {type: String, required: true, enum: ['Forum', 'Subforum']},
	title: {type: String, required: true, maxlength: 100},
	postedBy: {type: Number, required: true, ref: 'User'},
	lastPostBy: {type: Number, required: true, ref: 'User'}
}, {
	_id: false,
	timestamps: true,
});
schema.index({parentType: 1, parent: 1, updatedAt: -1});

schema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'thread',
	options: {sort: 'createdAt'}
});

schema.pre('save', async function(next) {
	try {
		let counter = await ThreadCounter.findByIdAndUpdate(
			{_id: 'entityId'},
			{$inc: {seq: 1}},
			{new: true, upsert: true}
		);

		this._id = counter.seq;
		next();
	}
	catch (err: any) {
		console.error(err);
		next(err);
	}
});

const Thread = model<IThread>('Thread', schema);
export default Thread;
export {IThread};