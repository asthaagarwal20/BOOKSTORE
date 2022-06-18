import Book from '../models/book.model';
import wishlist from '../models/wishlist.model';

export const checkwishlist = async (userid) => {
  const userwishlist = await wishlist.findOne({ userId: userid });
  if (userwishlist) {
    return userwishlist;
  } else {
    throw new Error('there is no wishlist of the user');
  }
};

export const addItemTowishlist = async (userid, _id) => {
  const book = await Book.findOne({ _id: _id });
  if (book) {
    const userwishlist = await wishlist.findOne({ userId: userid });
    if (userwishlist) {
      const tempbook = {
        bookImage: book.bookImage,
        bookName: book.bookName,
        author: book.author,
        price: book.price
      };
      let currwishlistbooks = userwishlist.books;
      let found = false;
      for (var i = 0; i < currwishlistbooks.length; i++) {
        if (currwishlistbooks[i].bookName === book.bookName) {
          found = true;
        }
      }
      if (!found) {
        userwishlist.books.push(tempbook);
        const updatedwishlist = await wishlist.findOneAndUpdate(
          { userId: userid },
          {
            books: userwishlist.books
          },
          { new: true }
        );
        // const updatedwishlist=checkwishlist(userid);
        console.log('updated wishlist ', updatedwishlist);
        return updatedwishlist;
      } else {
        throw new Error('This book is already present in the wishlist');
      }
    } else {
      let tempbook = {
        bookImage: book.bookImage,
        bookName: book.bookName,
        author: book.author,
        price: book.price
      };
      const newwishlist = {
        userId: userid,
        books: [tempbook]
      };
      await wishlist.create(newwishlist);
      const data = checkwishlist(userid);
      return data;
    }
  } else {
    throw new Error('The book with this id is not present in the store');
  }
};

export const removefromwishlist = async (userid, _id) => {
  const userwishlist = await wishlist.findOne({ userId: userid });
  if (userwishlist) {
    const book = await Book.findOne({ _id: _id });
    if (book) {
      let currwishlistbooks = userwishlist.books;
      let found = false;
      for (var i = 0; i < currwishlistbooks.length; i++) {
        if (currwishlistbooks[i].bookName === book.bookName) {
          var spliced = currwishlistbooks.splice(i, 1);
          found = true;
          break;
        }
      }
      if (found) {
        await wishlist.findOneAndUpdate(
          { userId: userid },
          {
            books: currwishlistbooks
          }
        );
        const updatedwishlist = checkwishlist(userid);
        console.log(updatedwishlist);
        return updatedwishlist;
      } else {
        throw new Error('this book is not present inside  the wishlist');
      }
    } else {
      throw new Error('The book with this id is not present in the store');
    }
  } else {
    throw new Error('wishlist of the user does not exist');
  }
};
