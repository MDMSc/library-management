import React, { useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReducerBooks, ReducerCustomers, ReducerIssues } from "./context/Reducer";
import { ReducerContext } from "./context/ReducerContext";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BooksTable from "./components/books/BooksTable";
import AddBook from "./components/books/AddBook";
import EditViewBook from "./components/books/EditViewBook";
import CustomerList from "./components/customers/CustomerList";
import AddCustomer from "./components/customers/AddCustomer";
import EditViewCustomer from "./components/customers/EditViewCustomer";
import AddIssue from "./components/issues/AddIssue";
import EditViewIssue from "./components/issues/EditViewIssue";
import IssueTable from "./components/issues/IssueTable";
import NavbarHeader from "./components/NavbarHeader";

function App() {
  const [stateB, dispatchB] = useReducer(ReducerBooks, {
    books: [],
    readOnlyB: true,
  });

  const [stateC, dispatchC] = useReducer(ReducerCustomers, {
    customers: [],
    readOnlyC: true,
  });

  const [stateI, dispatchI] = useReducer(ReducerIssues, {
    issues: [],
    readOnlyI: true,
  });

  return (
    <div>
      <ReducerContext.Provider value={{ stateB, stateC, stateI, dispatchB, dispatchC, dispatchI }}>
        <NavbarHeader />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/books" element={<BooksTable />} />
          <Route path="/book-add" element={<AddBook />} />
          <Route path="/book-edit/:bookID" element={<EditViewBook />} />
          <Route path="/book-view/:bookID" element={<EditViewBook />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customer-add" element={<AddCustomer />} />
          <Route path="/customer-edit/:custID" element={<EditViewCustomer />} />
          <Route path="/customer-view/:custID" element={<EditViewCustomer />} />
          <Route path="/issues" element={<IssueTable />} />
          <Route path="/issue-add/:bookID" element={<AddIssue />} />
          <Route path="/issue-edit/:issueID" element={<EditViewIssue />} />
          <Route path="/issue-view/:issueID" element={<EditViewIssue />} />
        </Routes>
      </ReducerContext.Provider>
    </div>
  );
}

export default App;
