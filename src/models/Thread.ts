import {Schema, model} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

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
	timestamps: true
});
schema.plugin(autoIncrement.plugin, 'Thread');

const Thread = model<IThread>('Thread', schema);
export default Thread;
export {IThread};
