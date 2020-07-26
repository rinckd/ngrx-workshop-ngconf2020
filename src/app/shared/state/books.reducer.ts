import { createReducer, on, Action, createSelector } from "@ngrx/store";
import { BookModel, calculateBooksGrossEarnings } from "src/app/shared/models";
import { BooksPageActions, BooksApiActions } from "src/app/books/actions";

const createBook = (books: BookModel[], book: BookModel) => [...books, book];
const updateBook = (books: BookModel[], changes: BookModel) =>
  books.map((book) => {
    return book.id === changes.id ? Object.assign({}, book, changes) : book;
  });
const deleteBook = (books: BookModel[], bookId: string) =>
  books.filter((book) => bookId !== book.id);

export interface State {
  collection: BookModel[];
  activeBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activeBookId: null,
};

export const booksReducer = createReducer(
  initialState,
  on(BooksPageActions.clearSelectedBook, BooksPageActions.enter, (state) => {
    return {
      ...state,
      activeBookId: null,
    };
  }),
  on(BooksApiActions.booksLoaded, (state, action) => {
    return {
      ...state,
      collection: action.books,
    };
  }),
  on(BooksApiActions.bookDeleted, (state, action) => {
    return {
      ...state,
      collection: deleteBook(state.collection, action.bookId),
    };
  }),
  on(BooksApiActions.bookCreated, (state, action) => {
    return {
      ...state,
      collection: createBook(state.collection, action.book),
    };
  }),
  on(BooksApiActions.bookUpdated, (state, action) => {
    return {
      ...state,
      collection: updateBook(state.collection, action.book),
    };
  }),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activeBookId: action.bookId,
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return booksReducer(state, action);
}

// leave selectors in reducers file

// getter selectors
export const selectAll = (state: State) => state.collection;
export const selectActiveBookId = (state: State) => state.activeBookId;

// complex selectors
export const selectActiveBook_unoptimized = (state: State) => {
  const books = selectAll(state);
  const activeBookId = selectActiveBookId(state);
  return books.find((book) => book.id === activeBookId);
};

// only run if two inputs change
export const selectActiveBook = createSelector(
  selectAll,
  selectActiveBookId,
  (books, activeBookId) => {
    return books.find((book) => book.id === activeBookId);
  }
);

export const selectEarningsTotals_unoptimized = (state: State) => {
  const books = selectAll(state);
  return calculateBooksGrossEarnings(books);
};

export const selectEarningsTotals = createSelector(selectAll, (books) => {
  calculateBooksGrossEarnings(books);
});

// final argument is projector function
export const selectEarningsTotals_cleaner = createSelector(
  selectAll,
  calculateBooksGrossEarnings
);
