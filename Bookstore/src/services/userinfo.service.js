import Userinfo from '../models/userinfo.model';

export const customerDetails = async (userid, body) => {
  const infoexist = await Userinfo.findOne({ userId: userid });
  if (infoexist) {
    throw new Error('user additional information already exist');
  } else {
    const data = await Userinfo.create(body);
    return data;
  }
};
