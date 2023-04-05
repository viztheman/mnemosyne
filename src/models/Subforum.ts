import {Schema, model} from 'mongoose';

interface ISubforumCounter {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<ISubforumCounter>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const SubforumCounter = model<ISubforumCounter>('SubforumCounter', counterSchema);

interface ISubforum {
	_id?: number;
	forum: number;
	title: string;
	order: number;
}

const schema = new Schema<ISubforum>({
	_id: Number,
	forum: {type: Number, required: true, ref: 'Forum'},
	title: {type: String, required: true, maxlength: 100},
	order: {type: Number, required: true, min: 1}
}, {
	_id: false,
	timestamps: true,
});

schema.virtual('threads', {
	ref: 'Thread',
	localField: '_id',
	foreignField: 'parent',
	match: {parentType: 'Subforum'}
});

schema.pre('save', async function(next) {
	try {
		let counter = await SubforumCounter.findByIdAndUpdate(
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

const Subforum = model<ISubforum>('Subforum', schema);
export default Subforum;
export {ISubforum};
