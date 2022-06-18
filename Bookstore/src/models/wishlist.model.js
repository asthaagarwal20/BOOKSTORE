import { object } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const wishlistSchema = new Schema(
  {
    userId: String,
    books: [
      {
        bookImage: {
          type: String
        },
        bookName: {
          type: String
        },
        author: {
          type: String
        },
        price: {
          type: Number
        }
      }
    ]
  },

  {
    timestamps: true
  }
);

export default model('wishlist', wishlistSchema);
