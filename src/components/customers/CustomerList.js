import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { DELETE_CUSTOMER, EDIT_CUSTOMER, VIEW_CUSTOMER } from "../../context/Action.type";
import { ReducerContext } from "../../context/ReducerContext";

export default function CustomerList() {
  const navigate = useNavigate();
  const { stateC, dispatchC } = useContext(ReducerContext);

  return (
    <Container className="main-container">
      <div className="d-flex justify-content-between">
        <h1> Customers List</h1>
        <Button
          color="link"
          type="button"
          onClick={() => {
            navigate("/customer-add");
          }}
        >
          Add New Customer
        </Button>
      </div>
      <Table bordered striped responsive>
        <thead>
          <tr className="table-dark">
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>No. of Issues</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stateC.customers.length > 0 ? (
            stateC.customers.map((customer, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{customer.custID}</td>
                <td>{customer.custName}</td>
                <td>{customer.custEmail}</td>
                <td>{customer.custPhone}</td>
                <td>{customer.custAddress}</td>
                <td>{customer.issueList.length}</td>
                <td className="d-flex flex-column">
                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchC({
                        type: EDIT_CUSTOMER,
                      });
                      navigate(`/customer-edit/${customer.custID}`);
                    }}
                  >
                    Edit Customer
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchC({
                        type: VIEW_CUSTOMER,
                      });
                      navigate(`/customer-view/${customer.custID}`);
                    }}
                  >
                    View Customer
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchC({
                        type: DELETE_CUSTOMER,
                        payload: customer.custID,
                      });

                      navigate("/customers");
                    }}
                  >
                    Delete Customer
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th>
                <span className="error">No Customers added to the Library</span>
              </th>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

