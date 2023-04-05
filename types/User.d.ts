import mongoose from 'mongoose';
interface IUser {
    _id?: number;
    username: string;
    email: string;
    passwordHash: string;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Schema<IUser, mongoose.Model<IUser, any, any, any, mongoose.Document<unknown, any, IUser> & Omit<IUser & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<IUser>> & Omit<mongoose.FlatRecord<IUser> & Required<{
    _id: number;
}>, never>>, any>;
export default User;
export { IUser };
