import {Schema, model} from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

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
schema.plugin(autoIncrement.plugin, 'Post');

const Post = model<IPost>('Post', schema);
export default Post;
export {IPost};
