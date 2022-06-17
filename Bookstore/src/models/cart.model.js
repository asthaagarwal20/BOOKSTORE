import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: {
      type: String
    },
    book: [
      {
        productId: {
          type: String
        },
        bookImage: { 
          type: String
        },
        description: {
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
      }
    ],
    cart_total: {
      type: Number
    },                   
    isPurchased: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('cart', cartSchema);
