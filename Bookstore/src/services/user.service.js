import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user
export const newUser = async (body) => {
  const data1 = await User.findOne({ email: body.email });
  if (data1 == null) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(body.password, salt);
    body.password = hashPassword;
    const data = await User.create(body);
    return data;
  } else {
    throw new Error('User already registered');
  }
};

export const login = async (body) => {
  const emailexist = await User.findOne({ email: body.email });
  console.log(emailexist);
  if (emailexist) {
    let match = await bcrypt.compare(body.password, emailexist.password);
    if (match) {
      let token = jwt.sign(
        { id: emailexist._id, email: emailexist.email },
        process.env.SECRET_KEY
      );
      return token;
    } else {
      throw new Error('Password did not match');
    }
  } else {
    throw new Error('user does not exist');
  }
};

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
