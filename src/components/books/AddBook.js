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
import { ADD_BOOK } from "../../context/Action.type";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const initialValues = {
  bookID: "",
  book_name: "",
  author: "",
  publisher: "",
  genre: "",
  pages: 0,
  serial_no: "",
};

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

export default function AddBook() {
  const { stateB, dispatchB } = useContext(ReducerContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.bookID = "B" + String(stateB.books.length + 1).padStart(4, "0");

      try {
        dispatchB({
          type: ADD_BOOK,
          payload: values,
        });

        setTimeout(() => {
            navigate("/books");
        }, 3000);

        return toast.success("New Book successfully added to the Library");
        
      } catch (error) {
        return toast.error(error.message);
      }
    },
    validationSchema,
  });

  return (
    <Container className="main-container">
        <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-center">New Book Entry</h1>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputGroupText>Book Name</InputGroupText>
          <Input
            placeholder="Book Name"
            id="book_name"
            name="book_name"
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
            invalid={formik.errors.genre && formik.touched.genre}
            {...formik.getFieldProps("genre")}
          >
            <option disabled value="">Select</option>
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
        <Button color="danger" block type="submit">
          {" "}
          Add{" "}
        </Button>
      </Form>
    </Container>
  );
}
