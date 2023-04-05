import mongoose from 'mongoose';
interface IForum {
    _id?: number;
    category: number;
    title: string;
    order: number;
}
declare const Forum: mongoose.Model<IForum, {}, {}, {}, mongoose.Schema<IForum, mongoose.Model<IForum, any, any, any, mongoose.Document<unknown, any, IForum> & Omit<IForum & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IForum, mongoose.Document<unknown, {}, mongoose.FlatRecord<IForum>> & Omit<mongoose.FlatRecord<IForum> & Required<{
    _id: number;
}>, never>>, any>;
export default Forum;
export { IForum };
