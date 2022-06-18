import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

export const addItemTowishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.addItemTowishlist(
      req.body.userid,
      req.params.bookId
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: ' Books added to wishlist successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const checkwishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.checkwishlist(req.body.userid);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'wishlist information fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const removefromwishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.removefromwishlist(
      req.body.userid,
      req.params.bookId
    );
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'the book have been removed from wishlist successfully'
    });
  } catch (error) {
    next(error);
  }
};
