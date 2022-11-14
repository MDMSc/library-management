import {
  ADD_BOOK,
  ADD_CUSTOMER,
  ADD_ISSUE,
  DELETE_BOOK,
  DELETE_CUSTOMER,
  DELETE_ISSUE,
  EDIT_BOOK,
  EDIT_CUSTOMER,
  EDIT_ISSUE,
  UPDATE_BOOK,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_ISSUELIST,
  UPDATE_CUSTOMER_ISSUELIST_DELETE,
  UPDATE_CUSTOMER_ISSUELIST_EDIT,
  UPDATE_ISSUE,
  VIEW_BOOK,
  VIEW_CUSTOMER,
  VIEW_ISSUE,
} from "./Action.type";

export const ReducerBooks = (state, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return { ...state, books: [...state.books, action.payload] };

    case EDIT_BOOK:
      return { ...state, readOnlyB: false };

    case VIEW_BOOK:
      return { ...state, readOnlyB: true };

    case UPDATE_BOOK:
      const updatedBook = action.payload;
      const updatedBookList = state.books.map((book) => {
        if (book.bookID === updatedBook.bookID) {
          return updatedBook;
        }
        return book;
      });
      return {
        ...state,
        books: updatedBookList,
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.bookID !== action.payload),
      };
    default:
      return state;
  }
};

// -------------------------------
export const ReducerCustomers = (state, action) => {
  switch (action.type) {
    case ADD_CUSTOMER:
      return { ...state, customers: [...state.customers, action.payload] };

    case EDIT_CUSTOMER:
      return { ...state, readOnlyC: false };

    case VIEW_CUSTOMER:
      return { ...state, readOnlyC: true };

    case UPDATE_CUSTOMER:
      const updatedCustomer = action.payload;
      const updatedCustomerList = state.customers.map((customer) => {
        if (customer.custID === updatedCustomer.custID) {
          return updatedCustomer;
        }
        return customer;
      });
      return {
        ...state,
        customers: updatedCustomerList,
      };

    case UPDATE_CUSTOMER_ISSUELIST:
      const updatedCustomerL = state.customers.map((customer) => {
        if (customer.custID === action.payload.custID) {
          customer.issueList.push({
            issueID: action.payload.issueID,
            bookID: action.payload.bookID,
            book_name: action.payload.book_name,
            author: action.payload.author,
            genre: action.payload.genre,
            publisher: action.payload.publisher,
            serial_no: action.payload.serial_no,
            issueStartDate: action.payload.issueStartDate,
            issueEndDate: action.payload.issueEndDate,
          });
        }
        return customer;
      });
      return {
        ...state,
        customers: updatedCustomerL,
      };

    case UPDATE_CUSTOMER_ISSUELIST_EDIT:
      let updIssue = [];
      const updatedCusIssue = action.payload;
      const updatedCusIssueList = state.customers.map((customer) => {
        if (customer.custID === updatedCusIssue.custID) {
          updIssue = customer.issueList.map((issue) => {
            if (issue.issueID === updatedCusIssue.issueID) {
              return updatedCusIssue;
            }
            return issue;
          });
        }
        customer.issueList = [...updIssue];
        return customer;
      });
      return {
        ...state,
        customers: updatedCusIssueList,
      };

    case UPDATE_CUSTOMER_ISSUELIST_DELETE:
      let cusIssueList = [];
      const updatedCusIssueDelete = state.customers.map((customer) => {
        if (customer.custID === action.payload.custID) {
          cusIssueList = customer.issueList.filter((issue) => issue.issueID !== action.payload.issueID);
          customer.issueList = [...cusIssueList]
        }
        return customer;
      });
      return {
        ...state,
        customers: updatedCusIssueDelete,
      };

    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.custID !== action.payload
        ),
      };
    default:
      return state;
  }
};

// -------------------------
export const ReducerIssues = (state, action) => {
  switch (action.type) {
    case ADD_ISSUE:
      return { ...state, issues: [...state.issues, action.payload] };

    case EDIT_ISSUE:
      return { ...state, readOnlyI: false };

    case VIEW_ISSUE:
      return { ...state, readOnlyI: true };

    case UPDATE_ISSUE:
      const updatedIssue = action.payload;
      const updatedIssueList = state.issues.map((issue) => {
        if (issue.issueID === updatedIssue.issueID) {
          return updatedIssue;
        }
        return issue;
      });
      return {
        ...state,
        issues: updatedIssueList,
      };

    case DELETE_ISSUE:
      return {
        ...state,
        issues: state.issues.filter(
          (issue) => issue.issueID !== action.payload
        ),
      };

    default:
      return state;
  }
};
