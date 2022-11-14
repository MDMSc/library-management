import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Table } from "reactstrap";
import { DELETE_ISSUE, EDIT_ISSUE, UPDATE_CUSTOMER_ISSUELIST_DELETE, VIEW_ISSUE } from "../../context/Action.type";
import { ReducerContext } from "../../context/ReducerContext";

export default function IssueTable() {
  const navigate = useNavigate();
  const { stateI, dispatchI, dispatchC } = useContext(ReducerContext);

  return (
    <Container className="main-container">
      <h1> Issued List</h1>
      <Table bordered striped responsive>
        <thead>
          <tr className="table-dark">
            <th>#</th>
            <th>Issue ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Serial Number</th>
            <th>Issue Start Date</th>
            <th>Issue End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stateI.issues.length > 0 ? (
            stateI.issues.map((issue, index) => (
              <tr key={index + 1}>
                <th scope="row">{index + 1}</th>
                <td>{issue.issueID}</td>
                <td>{issue.custID}</td>
                <td>{issue.custName}</td>
                <td>{issue.bookID}</td>
                <td>{issue.book_name}</td>
                <td>{issue.serial_no}</td>
                <td>{issue.issueStartDate}</td>
                <td>{issue.issueEndDate}</td>
                <td className="d-flex flex-column">
                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchI({
                        type: EDIT_ISSUE,
                      });
                      navigate(`/issue-edit/${issue.issueID}`);
                    }}
                  >
                    Edit Issue
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchI({
                        type: VIEW_ISSUE,
                      });
                      navigate(`/issue-view/${issue.issueID}`);
                    }}
                  >
                    View Issue
                  </Button>

                  <Button
                    color="link"
                    type="button"
                    onClick={() => {
                      dispatchI({
                        type: DELETE_ISSUE,
                        payload: issue.issueID,
                      });

                      dispatchC({
                        type: UPDATE_CUSTOMER_ISSUELIST_DELETE,
                        payload: {
                          custID: issue.custID,
                          issueID: issue.issueID
                        },
                      });

                      navigate("/issues");
                    }}
                  >
                    Delete Issue
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
