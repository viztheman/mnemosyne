const PAGE_SIZE = 40;

import {Document, Schema, model} from 'mongoose';

interface IForumCounter {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<IForumCounter>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const ForumCounter = model<IForumCounter>('ForumCounter', counterSchema);

interface IForum {
	_id?: number;
	category: number;
	title: string;
	order: number;
}

const schema = new Schema<IForum>({
	_id: Number,
	category: {type: Number, required: true, ref: 'Category'},
	title: {type: String, required: true, maxlength: 100},
	order: {type: Number, required: true, min: 1}
}, {
	_id: false,
	timestamps: true,
});
schema.index({category: 1, order: 1});

schema.virtual('subforums', {
	ref: 'Subforum',
	localField: '_id',
	foreignField: 'forum',
	options: {sort: 'order'}
});

schema.virtual('threads', {
	ref: 'Thread',
	localField: '_id',
	foreignField: 'parent',
	match: {parentType: 'Forum'},
	options: {sort: 'updatedAt'}
});

schema.pre('save', async function(next) {
	try {
		let counter = await ForumCounter.findByIdAndUpdate(
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

const Forum = model<IForum>('Forum', schema);
export default Forum;
export {IForum};
