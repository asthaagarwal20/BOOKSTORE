import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    addressType: {
      type: String,
      required: true
    },
    fullAddress: {
      type: String,
      required: true
    },
    city: {
      type: String
    },
    landmark: {
      type: String
    },
    state: {
      type: String
    },
    name: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    pincode: {
      type: String
    },
    locality: {
      type: String
    },
    userId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model('Userinfo', userSchema);
