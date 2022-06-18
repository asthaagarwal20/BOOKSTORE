import HttpStatus from 'http-status-codes';
import * as UserinfoService from '../services/userinfo.service';

export const customerDetails = async (req, res, next) => {
  try {
    const data = await UserService.customerDetails(req.body.userid, req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'customer details saved successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
