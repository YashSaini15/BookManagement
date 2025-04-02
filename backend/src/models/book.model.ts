import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  bookname: string;
  author: string;
  quantity: number;
  price: number;
  date: Date;
}

const bookSchema = new Schema<IBook>(
  {
    bookname: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Transform _id to id in the JSON response
bookSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export default mongoose.model<IBook>("Book", bookSchema);
