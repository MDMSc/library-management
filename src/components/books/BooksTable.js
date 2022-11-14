import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { DELETE_BOOK, EDIT_BOOK, VIEW_BOOK } from "../../context/Action.type";
import { ReducerContext } from "../../context/ReducerContext";

export default function BooksTable() {
  const navigate = useNavigate();
  const { stateB, dispatchB } = useContext(ReducerContext);

  return (
    <Container className="main-container">
      <div className="d-flex justify-content-between">
        <h1> Books List</h1>
        <Button
          color="link"
          type="button"
          onClick={() => {
            navigate("/book-add");
          }}
        >
          Add New Book
        </Button>
      </div>
      <Table bordered striped responsive>
        <thead>
          <tr className="table-dark">
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Genre</th>
            <th>No. of Pages</th>
            <th>Serial Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stateB.books.length > 0 ? (
            stateB.books.map((book, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{book.bookID}</td>
                <td>{book.book_name}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.genre}</td>
                <td>{book.pages}</td>
                <td>{book.serial_no}</td>
                <td className="d-flex flex-column">
                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      navigate(`/issue-add/${book.bookID}`);
                    }}
                  >
                    Issue Book
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchB({
                        type: EDIT_BOOK,
                      });
                      navigate(`/book-edit/${book.bookID}`);
                    }}
                  >
                    Edit Book
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchB({
                        type: VIEW_BOOK,
                      });
                      navigate(`/book-view/${book.bookID}`);
                    }}
                  >
                    View Book
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchB({
                        type: DELETE_BOOK,
                        payload: book.bookID,
                      });

                      navigate("/books");
                    }}
                  >
                    Delete Book
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th>
                <span className="error">No Books in the Library</span>
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
