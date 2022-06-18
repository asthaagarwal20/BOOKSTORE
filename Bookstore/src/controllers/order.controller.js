import HttpStatus from 'http-status-codes';
import * as orderService from '../services/order.service';

export const placeorder = async (req, res, next) => {
  try {
    const data = await orderService.placeorder(req.body.userid);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'order placed  successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
