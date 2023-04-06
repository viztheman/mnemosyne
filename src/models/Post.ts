import {Document, Schema, model} from 'mongoose';

interface IPostCounter {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<IPostCounter>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const PostCounter = model<IPostCounter>('PostCounter', counterSchema);

interface IPost {
	_id?: number;
	thread: number;
	text: string;
	html: string;
	postedBy: number;
	editedBy?: number;
}

const schema = new Schema<IPost>({
	_id: Number,
	thread: {type: Number, required: true, ref: 'Thread'},
	text: {type: String, required: true, maxlength: 100000},
	html: {type: String, required: true},
	postedBy: {type: Number, required: true, ref: 'User'},
	editedBy: {type: Number, ref: 'User'}
}, {
	_id: false,
	timestamps: true
});
schema.index({thread: 1, createdAt: 1});

schema.pre('save', async function(next) {
	try {
		let counter = await PostCounter.findByIdAndUpdate(
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

const Post = model<IPost>('Post', schema);
export default Post;
export {IPost};
