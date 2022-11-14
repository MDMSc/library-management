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
import {
  UPDATE_CUSTOMER_ISSUELIST_EDIT,
  UPDATE_ISSUE,
} from "../../context/Action.type";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const validationSchema = yup.object().shape({
  issueStartDate: yup
    .date()
    .min(
      moment().subtract(1, "days").format(),
      "Start date should be a current or future date in DD/MM/YYYY format"
    )
    .required("Required!!!"),
  issueEndDate: yup
    .date()
    .min(
      moment().format(),
      "End date should be a future date with a minimum of 1 day in DD/MM/YYYY format"
    )
    .required("Required!!!"),
});

export default function EditViewIssue() {
  const { issueID } = useParams();
  const { stateI, dispatchI, dispatchC } = useContext(ReducerContext);
  const navigate = useNavigate();

  let objIndex = -1;

  function getInitialValues() {
    objIndex = stateI.issues.findIndex((issue) => issue.issueID === issueID);
    if (objIndex < 0) {
      return (
        {
          issueID: "",
          bookID: "",
          book_name: "",
          author: "",
          publisher: "",
          genre: "",
          serial_no: "",
          issueStartDate: "",
          issueEndDate: "",
          custID: "",
          custName: "",
          custEmail: "",
          custPhone: "",
          custAddress: "",
        },
        toast.error(`No Issue found with Issue ID ${issueID}`)
      );
    }
    return {
      issueID: stateI.issues[objIndex].issueID,
      bookID: stateI.issues[objIndex].bookID,
      book_name: stateI.issues[objIndex].book_name,
      author: stateI.issues[objIndex].author,
      publisher: stateI.issues[objIndex].publisher,
      genre: stateI.issues[objIndex].genre,
      serial_no: stateI.issues[objIndex].serial_no,
      issueStartDate: stateI.issues[objIndex].issueStartDate,
      issueEndDate: stateI.issues[objIndex].issueEndDate,
      custID: stateI.issues[objIndex].custID,
      custName: stateI.issues[objIndex].custName,
      custEmail: stateI.issues[objIndex].custEmail,
      custPhone: stateI.issues[objIndex].custPhone,
      custAddress: stateI.issues[objIndex].custAddress,
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),

    onSubmit: (values) => {
      values.issueStartDate = moment(values.issueStartDate).format("DD/MM/YYYY");
      values.issueEndDate = moment(values.issueEndDate).format("DD/MM/YYYY");
      
      if (values.issueStartDate >= values.issueEndDate) {
        return toast.error(
          `End date must be a future date from Start date by atleast 1 day`
        );
      }
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
          type: UPDATE_ISSUE,
          payload: values,
        });

        dispatchC({
          type: UPDATE_CUSTOMER_ISSUELIST_EDIT,
          payload: issueCustomer,
        });

        setTimeout(() => {
          navigate("/issues");
        }, 3000);

        return toast.success(`Issue ${issueID} successfully updated`);
      } catch (error) {
        return toast.error(error.message);
      }
    },

    validationSchema,
  });

  return (
    <Container className="main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-center">Book Issue {issueID} Details</h1>
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
                type="date"
                id="issueStartDate"
                name="issueStartDate"
                {...formik.getFieldProps("issueStartDate")}
                readOnly={stateI.readOnlyI}
                disabled={stateI.readOnlyI}
              />
            </InputGroup>
            {formik.errors.issueStartDate && formik.touched.issueStartDate && (
              <FormFeedback style={{ display: "inline" }}>
                {formik.errors.issueStartDate}
              </FormFeedback>
            )}
          </Col>

          <Col>
            <InputGroup>
              <InputGroupText>Issue End Date</InputGroupText>
              <Input
                placeholder="Issue End Date"
                type="date"
                id="issueEndDate"
                name="issueEndDate"
                {...formik.getFieldProps("issueEndDate")}
                readOnly={stateI.readOnlyI}
                disabled={stateI.readOnlyI}
              />
            </InputGroup>
            {formik.errors.issueEndDate && formik.touched.issueEndDate && (
              <FormFeedback style={{ display: "inline" }}>
                {formik.errors.issueEndDate}
              </FormFeedback>
            )}
          </Col>
        </Row>
        <br />
        <hr />
        <br />

        <InputGroup>
          <InputGroupText>Customer ID</InputGroupText>
          <Input
            placeholder="Customer ID"
            id="custID"
            name="custID"
            {...formik.getFieldProps("custID")}
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
            {...formik.getFieldProps("custName")}
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
            {...formik.getFieldProps("custEmail")}
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
            {...formik.getFieldProps("custPhone")}
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
            {...formik.getFieldProps("custAddress")}
            readOnly
            disabled
          />
        </InputGroup>
        <br />

        {stateI.readOnlyI ? (
          ""
        ) : (
          <Button color="danger" block type="submit">
            {" "}
            Update Issue{" "}
          </Button>
        )}
      </Form>
    </Container>
  );
}
