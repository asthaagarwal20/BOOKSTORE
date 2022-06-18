import cart from '../models/cart.model';
import Order from '../models/order.model';

export const placeorder = async (userid) => {
  console.log(userid, 'inside  the service');
  const usercart = await cart.findOne({ userId: userid });
  if (usercart) {
    const currbooks = usercart.book;
    let currorders = [];
    for (var i = 0; i < currbooks.length; i++) {
      const tempbook = {
        productId: currbooks[i]._id,
        bookName: currbooks[i].bookName,
        quantity: currbooks[i].quantity,
        price: currbooks[i].price
      };
      currorders.push(tempbook);
    }

    const temp = {
      orders: currorders
    };
    console.log(currorders);

    const neworder = await Order.create(temp);
    await cart.findOneAndDelete({ userId: userid });
    return neworder;
  } else {
    throw new Error('cart of this user id does not exist');
  }
};
