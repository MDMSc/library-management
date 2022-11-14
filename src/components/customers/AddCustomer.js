import React, { useContext } from "react";
import {
  Button,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { ReducerContext } from "../../context/ReducerContext";
import { ADD_CUSTOMER } from "../../context/Action.type";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialValues = {
  custName: "",
  custEmail: "",
  custPhone: "",
  custAddress: "",
  issueList: [],
};

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

export default function AddCustomer() {
  const { stateC, dispatchC } = useContext(ReducerContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      values.custID = "CUS" + String(stateC.customers.length + 1).padStart(6, "0");

      try {
        dispatchC({
          type: ADD_CUSTOMER,
          payload: values,
        });

        setTimeout(() => {
          navigate("/customers");
        }, 3000);
        
        return toast.success("New Customer successfully added to the Library");
      } catch (error) {
        return toast.error(error.message);
      }
    },
    validationSchema,
  });

  return (
    <Container className="main-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-center">New Customer Entry</h1>
      <br />
      <Form onSubmit={formik.handleSubmit}>
        <InputGroup>
          <InputGroupText>Customer Name</InputGroupText>
          <Input
            placeholder="Customer Name"
            id="custName"
            name="custName"
            invalid={formik.errors.custName && formik.touched.custName}
            {...formik.getFieldProps("custName")}
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
          />
        </InputGroup>

        {formik.errors.custAddress && formik.touched.custAddress && (
          <FormFeedback style={{ display: "inline" }}>
            {formik.errors.custAddress}
          </FormFeedback>
        )}
        <br />

        <Button color="danger" block type="submit">
          {" "}
          Add{" "}
        </Button>
      </Form>
    </Container>
  );
}
