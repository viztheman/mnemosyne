const BCRYPT = /^\$2[ayb]\$.{56}$/;

import crypto from 'crypto';
import {Document, Schema, model} from 'mongoose';
import validator from 'validator';

declare module 'express' {
    interface UserRequest {
        user?: IUser;
    }
}

interface IUserCounter {
	_id: string;
	seq: number;
}

const counterSchema = new Schema<IUserCounter>({
	_id: {type: String, required: true},
	seq: {type: Number, default: 1}
});
const UserCounter = model<IUserCounter>('UserCounter', counterSchema);

interface IUser {
	_id?: number;
	username: string;
	email: string;
	passwordHash: string;
	isAdmin: boolean;
	apiKey: string;
}

const schema = new Schema<IUser>({
	_id: Number,
	username: {type: String, required: true, maxlength: 25, unique: true},
	email: {type: String, required: true, validate: validator.isEmail, unique: true},
	passwordHash: {type: String, required: true, match: BCRYPT},
	isAdmin: {type: Boolean, required: true, default: false},
	apiKey: {type: String, required: true, unique: true, default: () => crypto.randomBytes(32).toString('hex')}
}, {
	_id: false,
	timestamps: true
});

schema.pre('save', async function(next) {
	try {
		let counter = await UserCounter.findByIdAndUpdate(
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

const User = model<IUser>('User', schema);
export default User;
export {IUser};
