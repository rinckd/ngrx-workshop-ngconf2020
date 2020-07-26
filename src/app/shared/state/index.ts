import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromAuth from "./auth.reducer";
import * as fromBooks from "./books.reducer";
import { selectBook } from "src/app/books/actions/books-page.actions";

export interface State {
  books: fromBooks.State;
}

export const reducers: ActionReducerMap<State> = {
  books: fromBooks.reducer,
};

export const metaReducers: MetaReducer<State>[] = [];

// Books State
export const selectBookState = (state: State) => state.books;
export const selectActiveBook_unoptimized = (state: State) => {
  const booksState = selectBookState(state);
  return fromBooks.selectActiveBook(booksState);
};
export const selectActiveBook = createSelector(
  selectBookState,
  fromBooks.selectActiveBook
);

export const selectAllBooks = createSelector(
  selectBookState,
  fromBooks.selectAll
);

export const selectBooksEarningsTotals = createSelector(
  selectBookState,
  fromBooks.selectEarningsTotals
);
