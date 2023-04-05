import mongoose from 'mongoose';
declare module 'express' {
    interface UserRequest {
        user?: IUser;
    }
}
interface IUser {
    _id?: number;
    username: string;
    email: string;
    passwordHash: string;
    isAdmin: boolean;
    apiKey: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, any>;
export default User;
export { IUser };
