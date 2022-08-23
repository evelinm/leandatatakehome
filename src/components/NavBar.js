import React from "react";
import { 
  ButtonDropdown, 
  Dropdown, 
  Nav, 
  NavItem, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem } from "reactstrap";
import { useState } from "react";
import { NavLink } from "react-router-dom";


function NavBar() {
  const [dropdownUserOpen, setUserOpen] = useState(false);
  const [dropdownExpenseOpen, setExpenseOpen] = useState(false);
  const toggleUser = () => setUserOpen(!dropdownUserOpen);
  const toggleExpense = () => setExpenseOpen(!dropdownExpenseOpen);

  return (
    <div className="bg-[#22c55e] p-8">
      <Nav>
        <NavLink exact to="/" className="pr-4 text-2xl no-underline">
          Lean Data
        </NavLink>
        <NavItem>
          <Dropdown>
            <ButtonDropdown isOpen={dropdownUserOpen} toggle={toggleUser}>
              <DropdownToggle caret outline color="info">
                Users
              </DropdownToggle>
              <DropdownMenu>
                <NavLink to="/addUser" className="text-decoration-none">
                  <DropdownItem>
                    Add
                  </DropdownItem>
                </NavLink>
                <NavLink to="/editUser" className="text-decoration-none">
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                </NavLink>
                <NavLink to="/deleteUser" className="text-decoration-none">
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </ButtonDropdown>
          </Dropdown>
        </NavItem>
        <NavItem>
        <Dropdown>
            <ButtonDropdown isOpen={dropdownExpenseOpen} toggle={toggleExpense}>
              <DropdownToggle caret outline color="info">
                Expenses
              </DropdownToggle>
              <DropdownMenu>
                <NavLink to="/addExpense" className="text-decoration-none">
                  <DropdownItem>
                    Add
                  </DropdownItem>
                </NavLink>
                <NavLink to="/editExpense" className="text-decoration-none">
                  <DropdownItem>
                    Edit
                  </DropdownItem>
                </NavLink>
                <NavLink to="/deleteExpense" className="text-decoration-none">
                  <DropdownItem>
                    Delete
                  </DropdownItem>
                </NavLink>
              </DropdownMenu>
            </ButtonDropdown>
          </Dropdown>
        </NavItem>
      </Nav>
    </div>
  );
}

export default NavBar;