import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

export default function NavbarHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar
        className="navbar-light"
        color="secondary"
        expand="sm"
        fixed="top"
      >
        <NavbarBrand onClick={() => navigate("/")}>
          <h2 style={{"cursor": "pointer"}}>Library Management</h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse
          isOpen={isOpen}
          navbar
          className="justify-content-around"
        >
          <Nav navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Books
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={() => navigate("/books")}>
                  Books List
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/book-add")}>
                  Add New Book
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink onClick={() => navigate("/issues")} style={{"cursor": "pointer"}}>Issues</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Customers
              </DropdownToggle>
              <DropdownMenu end>
                <DropdownItem onClick={() => navigate("/customers")}>
                  Customers List
                </DropdownItem>
                <DropdownItem onClick={() => navigate("/customer-add")}>
                  Add Customer
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
