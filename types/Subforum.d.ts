import mongoose from 'mongoose';
interface ISubforum {
    _id?: number;
    forum: number;
    title: string;
    order: number;
}
declare const Subforum: mongoose.Model<ISubforum, {}, {}, {}, mongoose.Schema<ISubforum, mongoose.Model<ISubforum, any, any, any, mongoose.Document<unknown, any, ISubforum> & Omit<ISubforum & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ISubforum, mongoose.Document<unknown, {}, mongoose.FlatRecord<ISubforum>> & Omit<mongoose.FlatRecord<ISubforum> & Required<{
    _id: number;
}>, never>>, any>;
export default Subforum;
export { ISubforum };
