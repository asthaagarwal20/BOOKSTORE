import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

export const addItemToCart = async (req, res, next) => {
  try {
    const data = await cartService.addItemToCart(
      req.body.userid,
      req.params.bookId
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: ' Books added to cart successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const  checkcart= async (req, res, next) => {
  try {
    const data = await cartService.checkcart(req.body.userid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'cart information fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const  removebook= async (req, res, next) => {
  try {
    const data = await cartService.removebook(req.body.userid,req.params.bookId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'the book have been removed from cart successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const  updatecart= async (req, res, next) => {
  try {
    const data = await cartService.updatecart(req.body.userid,req.body,req.params.bookId);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'cart have been updated  successfully'
    });
  } catch (error) {
    next(error);
  }
};