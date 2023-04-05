import {Schema, model} from 'mongoose';

interface ICategoryCounter {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<ICategoryCounter>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const CategoryCounter = model<ICategoryCounter>('CategoryCounter', counterSchema);

interface ICategory {
	_id?: number;
	title: string;
	order: number;
}

const schema = new Schema<ICategory>({
	_id: Number,
	title: {type: String, required: true, maxlength: 50},
	order: {type: Number, required: true, min: 1}
}, {
	_id: false,
	timestamps: true
});

schema.virtual('forums', {
	ref: 'Forum',
	localField: '_id',
	foreignField: 'category',
	options: {sort: 'order'}
});

schema.pre('save', async function(next) {
	try {
		let counter = await CategoryCounter.findByIdAndUpdate(
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

const Category = model<ICategory>('Category', schema);
export default Category;
export {ICategory};