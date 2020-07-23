import { UserModel, BookModel } from "../models";
import { createReducer, on } from "@ngrx/store";
import { AuthApiActions, AuthUserActions } from "src/app/auth/actions";
import { BooksPageActions } from "src/app/books/actions";

export interface State {
  collection: BookModel[];
  activateBookId: string | null;
}

export const initialState: State = {
  collection: [],
  activateBookId: null,
};

export const booksReducer = createReducer(
  initialState,
  on(
    BooksPageActions.enter,
    BooksPageActions.clearSelectedBook,
    (state, action) => {
      return {
        ...state,
        activateBookId: null,
      };
    }
  ),
  on(BooksPageActions.selectBook, (state, action) => {
    return {
      ...state,
      activateBookId: action.bookId,
    };
  })
);
