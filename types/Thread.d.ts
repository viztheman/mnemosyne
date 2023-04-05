import mongoose from 'mongoose';
interface IThread {
    _id?: number;
    parent: number;
    parentType: string;
    title: string;
    postedBy: number;
    lastPostBy: number;
}
declare const Thread: mongoose.Model<IThread, {}, {}, {}, mongoose.Schema<IThread, mongoose.Model<IThread, any, any, any, mongoose.Document<unknown, any, IThread> & Omit<IThread & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IThread, mongoose.Document<unknown, {}, mongoose.FlatRecord<IThread>> & Omit<mongoose.FlatRecord<IThread> & Required<{
    _id: number;
}>, never>>, any>;
export default Thread;
export { IThread };
