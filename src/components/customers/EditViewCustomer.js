import React, { useContext } from "react";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
  Table,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReducerContext } from "../../context/ReducerContext";
import { UPDATE_CUSTOMER } from "../../context/Action.type";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = yup.object().shape({
  custName: yup.string().required("Required!!!"),
  custEmail: yup
    .string()
    .email("Must be a valid email")
    .required("Required!!!"),
  custPhone: yup
    .string()
    .matches(/^0[0-9]+$/, "Must be only digits. 1st digit should be 0 only.")
    .min(11, "Must be exactly 11 digits. 1st digit should be 0 only.")
    .max(11, "Must be exactly 11 digits. 1st digit should be 0 only.")
    .required("Required!!!"),
  custAddress: yup.string().required("Required!!!"),
});

export default function EditViewCustomer() {
  const { custID } = useParams();
  const { stateC, dispatchC } = useContext(ReducerContext);
  const navigate = useNavigate();

  let objIndex = -1;

  function getInitialValues() {
    objIndex = stateC.customers.findIndex(
      (customer) => customer.custID === custID
    );
    if (objIndex < 0) {
      return (
        {
          custID: "",
          custName: "",
          custEmail: "",
          custPhone: "",
          custAddress: "",
          issueList: [],
        },
        toast.error(`No Customer found with Customer ID ${custID}`)
      );
    }
    return {
      custID: stateC.customers[objIndex].custID,
      custName: stateC.customers[objIndex].custName,
      custEmail: stateC.customers[objIndex].custEmail,
      custPhone: stateC.customers[objIndex].custPhone,
      custAddress: stateC.customers[objIndex].custAddress,
      issueList: [...stateC.customers[objIndex].issueList],
    };
  }

  const formik = useFormik({
    initialValues: getInitialValues(),

    onSubmit: (values) => {
      try {
        dispatchC({
          type: UPDATE_CUSTOMER,
          payload: values,
        });

        setTimeout(() => {
          navigate("/customers");
        }, 3000);

        return toast.success(`Customer ${custID} updated successfully`);
      } catch (error) {
        return toast.error(error.message);
      }
    },

    validationSchema,
  });

  return (
    <Container className="main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      {stateC.readOnlyC ? (
        <h1 className="text-center">View Customer Details</h1>
      ) : (
        <h1 className="text-center">Edit Customer Details</h1>
      )}
      <br />

      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputGroupText>Customer ID</InputGroupText>
          <Input
            placeholder="Customer ID"
            id="custID"
            name="custID"
            readOnly
            disabled
            {...formik.getFieldProps("custID")}
          />
        </InputGroup>
        <br />

        <InputGroup>
          <InputGroupText>Customer Name</InputGroupText>
          <Input
            placeholder="Customer Name"
            id="custName"
            name="custName"
            invalid={formik.errors.custName && formik.touched.custName}
            {...formik.getFieldProps("custName")}
            readOnly={stateC.readOnlyC}
            disabled={stateC.readOnlyC}
          />
        </InputGroup>

        {formik.errors.custName && formik.touched.custName && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.custName}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Customer Email</InputGroupText>
          <Input
            placeholder="Customer Email"
            id="custEmail"
            name="custEmail"
            invalid={formik.errors.custEmail && formik.touched.custEmail}
            {...formik.getFieldProps("custEmail")}
            readOnly={stateC.readOnlyC}
            disabled={stateC.readOnlyC}
          />
        </InputGroup>

        {formik.errors.custEmail && formik.touched.custEmail && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.custEmail}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Customer Phone</InputGroupText>
          <Input
            placeholder="Customer Phone"
            id="custPhone"
            name="custPhone"
            invalid={formik.errors.custPhone && formik.touched.custPhone}
            {...formik.getFieldProps("custPhone")}
            readOnly={stateC.readOnlyC}
            disabled={stateC.readOnlyC}
          />
        </InputGroup>

        {formik.errors.custPhone && formik.touched.custPhone && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.custPhone}
          </FormFeedback>
        )}
        <br />

        <InputGroup>
          <InputGroupText>Customer Address</InputGroupText>
          <Input
            placeholder="Customer Address"
            id="custAddress"
            name="custAddress"
            invalid={formik.errors.custAddress && formik.touched.custAddress}
            {...formik.getFieldProps("custAddress")}
            readOnly={stateC.readOnlyC}
            disabled={stateC.readOnlyC}
          />
        </InputGroup>

        {formik.errors.custAddress && formik.touched.custAddress && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.custAddress}
          </FormFeedback>
        )}
        <br />

        {stateC.readOnlyC ? (
          ""
        ) : (
          <Button color="danger" block type="submit">
            {" "}
            Save{" "}
          </Button>
        )}
        <br />
      <hr />
      <br />

      <h1>View Customer Details</h1>
      <br />

      <Table bordered striped responsive>
        <thead>
          <tr className="table-dark">
            <th>#</th>
            <th>Issue ID</th>
            <th>Book ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>Genre</th>
            <th>Serial Number</th>
            <th>Issue Start Date</th>
            <th>Issue End Date</th>
          </tr>
        </thead>
        <tbody>
          {formik.values.issueList.length > 0 ? (
            formik.values.issueList.map((issue, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{issue.issueID}</td>
                <td>{issue.bookID}</td>
                <td>{issue.book_name}</td>
                <td>{issue.author}</td>
                <td>{issue.publisher}</td>
                <td>{issue.genre}</td>
                <td>{issue.serial_no}</td>
                <td>{issue.issueStartDate}</td>
                <td>{issue.issueEndDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <th>
                <span className="error">No Books issued yet</span>
              </th>
            </tr>
          )}
        </tbody>
      </Table>
      </Form>

    </Container>
  );
}
