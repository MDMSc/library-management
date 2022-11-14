import React, { useContext, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import { ReducerContext } from "../../context/ReducerContext";
import {
  ADD_ISSUE,
  UPDATE_CUSTOMER_ISSUELIST,
} from "../../context/Action.type";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function AddIssue() {
  const { bookID } = useParams();
  const { stateB, stateI, dispatchI, stateC, dispatchC } = useContext(
    ReducerContext
  );
  const navigate = useNavigate();

  const [customerID, setCustomerID] = useState("");
  const [isCustomer, setIsCustomer] = useState(false);
  const [customer, setCustomer] = useState({
    custID: "",
    custName: "",
    custEmail: "",
    custPhone: "",
    custAddress: "",
  });

  let objIndexB = -1;
  let objIndexC = -1;

  function handleClick() {
    objIndexC = stateC.customers.findIndex(
      (item) => item.custID === customerID
    );

    if (objIndexC >= 0) {
      setCustomer({
        custID: customerID,
        custName: stateC.customers[objIndexC].custName,
        custEmail: stateC.customers[objIndexC].custEmail,
        custPhone: stateC.customers[objIndexC].custPhone,
        custAddress: stateC.customers[objIndexC].custAddress,
      });
      setIsCustomer(true);
    } else {
      return toast.error(
        `No Customer with ID ${customerID}. Kinldy add customer first.`
      );
    }
  }

  function getInitialValues() {
    objIndexB = stateB.books.findIndex((book) => book.bookID === bookID);
    if (objIndexB < 0) {
      return (
        {
          bookID: "",
          book_name: "",
          author: "",
          publisher: "",
          genre: "",
          serial_no: "",
          issueStartDate: "",
          issueEndDate: "",
        },
        toast.error(`No Book found with Book ID ${bookID}`)
      );
    }
    return {
      bookID: stateB.books[objIndexB].bookID,
      book_name: stateB.books[objIndexB].book_name,
      author: stateB.books[objIndexB].author,
      publisher: stateB.books[objIndexB].publisher,
      genre: stateB.books[objIndexB].genre,
      serial_no: stateB.books[objIndexB].serial_no,
      issueStartDate: moment().format("DD/MM/YYYY"),
      issueEndDate: moment().add(7, "d").format("DD/MM/YYYY"),
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),

    onSubmit: (values) => {
      values.issueID = "I" + String(stateI.issues.length + 1).padStart(4, "0");
      values.custID = customer.custID;
      values.custName = customer.custName;
      values.custEmail = customer.custEmail;
      values.custPhone = customer.custPhone;
      values.custAddress = customer.custAddress;

      const issueCustomer = {
        custID: values.custID,
        issueID: values.issueID,
        bookID: values.bookID,
        book_name: values.book_name,
        author: values.author,
        publisher: values.publisher,
        genre: values.genre,
        serial_no: values.serial_no,
        issueStartDate: values.issueStartDate,
        issueEndDate: values.issueEndDate,
      };

      try {
        dispatchI({
          type: ADD_ISSUE,
          payload: values,
        });

        dispatchC({
          type: UPDATE_CUSTOMER_ISSUELIST,
          payload: issueCustomer,
        });

        setTimeout(() => {
          navigate("/issues");
        }, 3000);

        return toast.success(`Book ${bookID} successfully issued to customer`);
      } catch (error) {
        return toast.error(error.message);
      }
    },
  });

  return (
    <Container className="main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-center">New Book Issue</h1>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputGroupText>Book ID</InputGroupText>
          <Input
            placeholder="Book ID"
            id="bookID"
            name="bookID"
            {...formik.getFieldProps("bookID")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Book Name</InputGroupText>
          <Input
            placeholder="Book Name"
            id="book_name"
            name="book_name"
            {...formik.getFieldProps("book_name")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Author</InputGroupText>
          <Input
            placeholder="Author"
            id="author"
            name="author"
            {...formik.getFieldProps("author")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Publisher</InputGroupText>
          <Input
            placeholder="Publisher"
            id="publisher"
            name="publisher"
            {...formik.getFieldProps("publisher")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Genre</InputGroupText>
          <Input
            placeholder="Genre"
            id="genre"
            name="genre"
            {...formik.getFieldProps("genre")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Serial No.</InputGroupText>
          <Input
            placeholder="Serial No."
            id="serial_no"
            name="serial_no"
            {...formik.getFieldProps("serial_no")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        <Row>
          <Col>
            <InputGroup>
              <InputGroupText>Issue Start Date</InputGroupText>
              <Input
                placeholder="Issue Start Date"
                id="issueStartDate"
                name="issueStartDate"
                {...formik.getFieldProps("issueStartDate")}
                readOnly
                disabled
              />
            </InputGroup>
          </Col>

          <Col>
            <InputGroup>
              <InputGroupText>Issue End Date</InputGroupText>
              <Input
                placeholder="Issue End Date"
                id="issueEndDate"
                name="issueEndDate"
                {...formik.getFieldProps("issueEndDate")}
                readOnly
                disabled
              />
            </InputGroup>
          </Col>
        </Row>
        <br />
        <InputGroup>
          <InputGroupText>Customer ID</InputGroupText>
          <Input
            placeholder="Customer ID"
            id="custID"
            name="custID"
            onChange={(e) => setCustomerID(e.target.value)}
          />

          <Button color="success" type="button" onClick={handleClick}>
            {" "}
            Check{" "}
          </Button>
        </InputGroup>
        <br />

        {isCustomer && (
          <>
            <hr />
            <br />
            <InputGroup>
              <InputGroupText>Customer ID</InputGroupText>
              <Input
                placeholder="Customer ID"
                id="custID"
                name="custID"
                value={customer.custID}
                readOnly
                disabled
              />
            </InputGroup>
            <br />

            <InputGroup>
              <InputGroupText>Customer Name</InputGroupText>
              <Input
                placeholder="Customer Name"
                id="custName"
                name="custName"
                value={customer.custName}
                readOnly
                disabled
              />
            </InputGroup>
            <br />

            <InputGroup>
              <InputGroupText>Customer Email</InputGroupText>
              <Input
                placeholder="Customer Email"
                id="custEmail"
                name="custEmail"
                value={customer.custEmail}
                readOnly
                disabled
              />
            </InputGroup>
            <br />

            <InputGroup>
              <InputGroupText>Customer Phone</InputGroupText>
              <Input
                placeholder="Customer Phone"
                id="custPhone"
                name="custPhone"
                value={customer.custPhone}
                readOnly
                disabled
              />
            </InputGroup>
            <br />

            <InputGroup>
              <InputGroupText>Customer Address</InputGroupText>
              <Input
                placeholder="Customer Address"
                id="custAddress"
                name="custAddress"
                value={customer.custAddress}
                readOnly
                disabled
              />
            </InputGroup>
            <br />

            <Button color="danger" block type="submit">
              {" "}
              Issue Book{" "}
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
}
