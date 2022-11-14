import React, { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReducerContext } from "../../context/ReducerContext";
import { UPDATE_BOOK } from "../../context/Action.type";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const genres = [
  "Horror",
  "Mystry",
  "Thriller",
  "Fiction",
  "Non-Fiction",
  "Poetry",
  "Sci-fi",
  "Drama",
  "Travel Literature",
  "Humor",
  "Biography",
  "Autobiography",
  "Adventure",
  "Fantasy",
  "Action",
  "Romance",
  "Contemporary",
  "Fairy Tales",
];

const validationSchema = yup.object().shape({
  book_name: yup.string().required("Required!!!"),
  author: yup.string().required("Required!!!"),
  publisher: yup.string().required("Required!!!"),
  genre: yup.string().required("Required!!!"),
  pages: yup
    .number("Enter only numbers")
    .integer()
    .positive("Page numbers must be positive")
    .nullable(true)
    .required("Required!!!"),
  serial_no: yup.string().required("Required!!!"),
});

export default function EditViewBook() {
  const { bookID } = useParams();
  const { stateB, dispatchB } = useContext(ReducerContext);
  const navigate = useNavigate();

  let objIndex = -1;

  function getInitialValues() {
    objIndex = stateB.books.findIndex((book) => book.bookID === bookID);
    if (objIndex < 0) {
      return (
        {
          bookID: "",
          book_name: "",
          author: "",
          publisher: "",
          genre: "",
          pages: 0,
          serial_no: "",
        },
        toast.error(`No Book found with Book ID ${bookID}`)
      );
    }
    return {
      bookID: stateB.books[objIndex].bookID,
      book_name: stateB.books[objIndex].book_name,
      author: stateB.books[objIndex].author,
      publisher: stateB.books[objIndex].publisher,
      genre: stateB.books[objIndex].genre,
      pages: stateB.books[objIndex].pages,
      serial_no: stateB.books[objIndex].serial_no,
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),

    onSubmit: (values) => {
      try {
        dispatchB({
          type: UPDATE_BOOK,
          payload: values,
        });

        setTimeout(() => {
          navigate("/books");
        }, 3000);

        return toast.success(`Book ${bookID} updated successfully`);
      } catch (error) {
        return toast.error(error.message);
      }
    },

    validationSchema,
  });

  return (
    <Container className="main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      {stateB.readOnlyB ? (
        <h1 className="text-center">View Book Details</h1>
      ) : (
        <h1 className="text-center">Edit Book Details</h1>
      )}
      <br />

      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputGroupText>Book ID</InputGroupText>
          <Input
            placeholder="Book ID"
            id="bookID"
            name="bookID"
            readOnly
            disabled
            {...formik.getFieldProps("bookID")}
          />
        </InputGroup>
        <br />
        <InputGroup>
          <InputGroupText>Book Name</InputGroupText>
          <Input
            placeholder="Book Name"
            id="book_name"
            name="book_name"
            readOnly={stateB.readOnlyB}
            disabled={stateB.readOnlyB}
            invalid={formik.errors.book_name && formik.touched.book_name}
            {...formik.getFieldProps("book_name")}
          />
        </InputGroup>
        {formik.errors.book_name && formik.touched.book_name && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.book_name}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Author</InputGroupText>
          <Input
            placeholder="Author"
            id="author"
            name="author"
            readOnly={stateB.readOnlyB}
            disabled={stateB.readOnlyB}
            invalid={formik.errors.author && formik.touched.author}
            {...formik.getFieldProps("author")}
          />
        </InputGroup>
        {formik.errors.author && formik.touched.author && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.author}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Publisher</InputGroupText>
          <Input
            placeholder="Publisher"
            id="publisher"
            name="publisher"
            readOnly={stateB.readOnlyB}
            disabled={stateB.readOnlyB}
            invalid={formik.errors.publisher && formik.touched.publisher}
            {...formik.getFieldProps("publisher")}
          />
        </InputGroup>
        {formik.errors.publisher && formik.touched.publisher && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.publisher}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Genre</InputGroupText>
          <Input
            placeholder="Genre"
            type="select"
            id="genre"
            name="genre"
            readOnly={stateB.readOnlyB}
            disabled={stateB.readOnlyB}
            invalid={formik.errors.genre && formik.touched.genre}
            {...formik.getFieldProps("genre")}
          >
            {genres.map((g, index) => (
              <option key={index} value={g}>
                {g}
              </option>
            ))}
          </Input>
        </InputGroup>
        {formik.errors.genre && formik.touched.genre && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.genre}
          </FormFeedback>
        )}
        <br />

        <Row>
          <Col>
            <InputGroup>
              <InputGroupText>Number of page</InputGroupText>
              <Input
                placeholder="Number of page"
                id="pages"
                name="pages"
                readOnly={stateB.readOnlyB}
                disabled={stateB.readOnlyB}
                invalid={formik.errors.pages && formik.touched.pages}
                {...formik.getFieldProps("pages")}
              />
            </InputGroup>
            {formik.errors.pages && formik.touched.pages && (
              <FormFeedback style={{ display: "inline" }}>
                {formik.errors.pages}
              </FormFeedback>
            )}
            <br />
          </Col>
          <Col>
            <InputGroup>
              <InputGroupText>Serial no</InputGroupText>
              <Input
                placeholder="Serial no"
                id="serial_no"
                name="serial_no"
                readOnly={stateB.readOnlyB}
                disabled={stateB.readOnlyB}
                invalid={formik.errors.serial_no && formik.touched.serial_no}
                {...formik.getFieldProps("serial_no")}
              />
            </InputGroup>
            {formik.errors.serial_no && formik.touched.serial_no && (
              <FormFeedback style={{ display: "inline" }}>
                {formik.errors.serial_no}
              </FormFeedback>
            )}
          </Col>
        </Row>
        <br />
        {stateB.readOnlyB ? (
          ""
        ) : (
          <Button color="danger" block type="submit">
            {" "}
            Save{" "}
          </Button>
        )}
      </Form>
    </Container>
  );
}
