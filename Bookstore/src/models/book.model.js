import { Schema, model } from 'mongoose';

const bookSchema = new Schema(
  {
    description: {
      type: String
    },
    discountPrice: {
      type: Number
    },
    bookImage: {
      type: String
    },
    admin_user_id: {
      type: String
    },
    bookName: {
      type: String
    },
    author: {
      type: String
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

export default model('Book', bookSchema);
