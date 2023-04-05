import mongoose from 'mongoose';
interface ICategory {
    _id?: number;
    title: string;
    order: number;
}
declare const Category: mongoose.Model<ICategory, {}, {}, {}, mongoose.Schema<ICategory, mongoose.Model<ICategory, any, any, any, mongoose.Document<unknown, any, ICategory> & Omit<ICategory & Required<{
    _id: number;
}>, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ICategory, mongoose.Document<unknown, {}, mongoose.FlatRecord<ICategory>> & Omit<mongoose.FlatRecord<ICategory> & Required<{
    _id: number;
}>, never>>, any>;
export default Category;
export { ICategory };
