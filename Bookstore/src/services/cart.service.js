import cart from '../models/cart.model';
import Book from '../models/book.model';

export const addItemToCart = async (userid, _id) => {
  console.log(userid, 'userid', _id);
  const book = await Book.findOne({ _id: _id });
  if (book) {
    const usercart = await cart.findOne({ userId: userid });
    console.log(usercart, 'usercart');
    if (usercart) {
      const tempbook = {
        productId: book._id,
        bookImage: book.bookImage,
        description: book.description,
        bookName: book.bookName,
        author: book.author,
        quantity: 1,
        price: book.price
      };

      let currcartbooks = usercart.book;
      let found = false;
      for (var i = 0; i < currcartbooks.length; i++) {
        if (currcartbooks[i].bookName === book.bookName) {
          found = true;
        }
      }
      if (!found) {
        usercart.book.push(tempbook);
        let currTotalPrice = usercart.cart_total + book.price;
        const updatedcart = await cart.findOneAndUpdate(
          { userId: userid },
          {
            book: usercart.book,
            cart_total: currTotalPrice
          },
          {
            new: true
          }
        );
        return updatedcart;
      } else {
        throw new Error('This book is already present in the cart');
      }
    } else {
      let tempbook = {
        productId: book._id,
        bookImage: book.bookImage,
        description: book.description,
        bookName: book.bookName,
        author: book.author,
        quantity: 1,
        price: book.price
      };
      const newcart = {
        userId: userid,
        book: [tempbook],
        cart_total: tempbook.price
      };
      console.log(newcart + ' it the new cart');
      const updatedcart = await cart.create(newcart);
      return updatedcart;
    }
  } else {
    throw new Error('The book with this id is not present in the store');
  }
};

export const checkcart = async (userid) => {
  const usercart = await cart.findOne({ userId: userid });
  console.log('checking cart is present or not', usercart);
  if (usercart) {
    return usercart;
  } else {
    throw new Error('user cart does not exist');
  }
};

export const removebook = async (userid, _id) => {
  const book = await Book.findOne({ _id: _id });
  if (book) {
    const usercart = await cart.findOne({ userId: userid });
    if (usercart) {
      let currcartbooks = usercart.book;
      let found = false;
      for (var i = 0; i < currcartbooks.length; i++) {
        if (currcartbooks[i].bookName === book.bookName) {
          var spliced = currcartbooks.splice(i, 1);
          found = true;
          break;
        }
      }
      console.log(currcartbooks, 'remaining books');
      if (found) {
        let currTotalPrice = usercart.cart_total - book.price;
        console.log(currTotalPrice);
        await cart.findOneAndUpdate(
          { userId: userid },
          {
            book: currcartbooks,
            cart_total: currTotalPrice
          }
        );
        const updatedcart = checkcart(userid);
        return updatedcart;
      } else {
        throw new Error('this book is not present inside  the cart');
      }
    } else {
      throw new Error('cart of the user does not exist');
    }
  } else {
    throw new Error('The book with this userid is not present in the store');
  }
};

export const updatecart = async (userid, body, _id) => {
  const usercart = await cart.findOne({ userId: userid });

  if (usercart) {
    const book = await Book.findOne({ _id: _id });
    if (book) {
      let currcartbooks = usercart.book;
      let found = false;
      let currTotalPrice = 0;
      for (var i = 0; i < currcartbooks.length; i++) {
        if (currcartbooks[i].bookName === book.bookName) {
          if (body.update === 'Increase') {
            currcartbooks[i].quantity = currcartbooks[i].quantity + 1;
            currTotalPrice = usercart.cart_total + book.price;
            found = true;
          } else if (body.update === 'Decrease') {
            currcartbooks[i].quantity = currcartbooks[i].quantity - 1;
            currTotalPrice = usercart.cart_total - book.price;
            found = true;
          }
          break;
        }
      }
      console.log(currcartbooks, 'remaining books');
      if (found) {
        await cart.findOneAndUpdate(
          { userId: userid },
          {
            book: currcartbooks,
            cart_total : currTotalPrice
          }
        );
        const updatedcart = checkcart(userid);
        return updatedcart;
      } else {
        throw new Error('Enter valid details in body');
      }
    } else {
      throw new Error('The book with this userid is not present in the store');
    }
  } else {
    throw new Error('cart of the user does not exist');
  }
};
