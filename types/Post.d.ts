import mongoose from 'mongoose';
interface IPost {
    _id?: number;
    thread: number;
    text: string;
    html: string;
    postedBy: number;
    editedBy?: number;
}
declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Schema<IPost, mongoose.Model<IPost, any, any, any, mongoose.Document<unknown, any, IPost> & Omit<IPost & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IPost, mongoose.Document<unknown, {}, mongoose.FlatRecord<IPost>> & Omit<mongoose.FlatRecord<IPost> & Required<{
    _id: number;
}>, never>>, any>;
export default Post;
export { IPost };
