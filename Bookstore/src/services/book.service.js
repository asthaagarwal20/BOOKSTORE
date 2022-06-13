import Book from '../models/book.model';

export const getAllBooks = async () => {
  const data = await Book.find();
  return data;
};

export const getBooksById = async (id) => {
  const data = await Book.findOne({ _id: id });
  return data;
};
