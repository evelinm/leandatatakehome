import expenses from "./temp-backend/expenses";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import TablesContainer from "./components/TablesContainer";
import NavBar from "./components/NavBar";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import AddExpenseForm from "./components/AddExpenseForm";
import EditExpenseForm from "./components/EditExpenseForm";
import DeleteExpenseForm from "./components/DeleteExpenseForm";
import generateCompanyExpensesTable from "./helpers/generateCompanyExpensesTable";
import generateUsersTable from "./helpers/generateUsersTable";

function App() {
  const [companyExpenseTable, setCompanyExpenseTable] = useState(
    generateCompanyExpensesTable(expenses)
  );
  const [usersTable, setUsersTable] = useState(generateUsersTable());
  const [expensesTable, setExpensesTable] = useState(expenses);
  const [tableData, setTableData] = useState([
    usersTable, 
    expensesTable, 
    companyExpenseTable
  ]);


  useEffect(function(){
    setTableData([
      usersTable, 
      expensesTable, 
      companyExpenseTable
    ])
  },[companyExpenseTable, expensesTable, usersTable])

  async function addUser(formData) {
    let users = [...usersTable.users, {...formData, totalExpenses:0}];
    setUsersTable({users});
  }


  async function editUser(formData) {
    let oldName = formData.user;
    let [oldFirstName, oldLastName] = oldName.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
        user.firstName === oldFirstName && user.lastName === oldLastName
      ));
    users[userIdx].firstName = formData.firstName;
    users[userIdx].lastName = formData.lastName;
    setUsersTable({users});

    let expenses = [...expensesTable.expenses];
    expenses.forEach( e => {
      if(e.fullName === formData.user) {
        e.fullName = `${formData.firstName} ${formData.lastName}`
      }
    });
    setExpensesTable({expenses});
  }

 
  async function deleteUser(formData) {
    let [firstName, lastName] = formData.user.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users.splice(userIdx,1);
    setUsersTable({users});
    
    let expenses = [...expensesTable.expenses];
    let delIdx = [];
  
    expenses.forEach( (e, idx) => {
      if(e.fullName === formData.user) {
        delIdx.push(idx);
      }
    });
    for(let i = delIdx.length-1; i>=0; i--){
      expenses.splice(delIdx[i],1);
    }
    setExpensesTable({expenses});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }

  //add expense logic
  async function addExpense(formData) {
    let expenses = [...expensesTable.expenses, {...formData}];
    setExpensesTable({expenses});
    
    let [firstName, lastName] = formData.fullName.split(" ");
    let users = [...usersTable.users];
    let userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users[userIdx] = {
      firstName, 
      lastName, 
      totalExpenses: (users[userIdx].totalExpenses+formData.cost)}
    setUsersTable({users});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }

  //edit expense logic
  async function editExpense(formData) {
    let expenses = [...expensesTable.expenses];
    const oldCost = expenses[formData.expenseIdx].cost;
    expenses[formData.expenseIdx] = {
      fullName: formData.fullName,
      category: formData.category,
      description: formData.description,
      cost: formData.cost
    };
    setExpensesTable({expenses});

    console.log(oldCost);
    let users = [...usersTable.users];
    const [firstName, lastName] = formData.fullName.split(" ");
    const cost = formData.cost;
    const userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users[userIdx] = {firstName, lastName, totalExpenses: (users[userIdx].totalExpenses-oldCost+cost)}
    setUsersTable({users});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }

  //delete expense logic
  async function deleteExpense(formData) {
    const expenseIdx = formData.expenseIdx;
    let expenses = [...expensesTable.expenses];
    const [firstName, lastName] = expenses[expenseIdx].fullName.split(" ");
    const cost = expenses[expenseIdx].cost;
    expenses.splice(expenseIdx,1);
    setExpensesTable({expenses});

    let users = [...usersTable.users];
    const userIdx = users.findIndex( user => (
      user.firstName === firstName && user.lastName === lastName
      ));
    users[userIdx] = {firstName, lastName, totalExpenses: (users[userIdx].totalExpenses-cost)}
    setUsersTable({users});
    setCompanyExpenseTable(generateCompanyExpensesTable({expenses}));
  }
  
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route  path="/" element={<TablesContainer tables={tableData} />}/>
          <Route path="/addUser" element={  <AddUserForm addUser={addUser} />}/>
          <Route path="/editUser" element={ <EditUserForm editUser={editUser} users={usersTable.users}/>}/>
          <Route path="/deleteUser" element={ <DeleteUserForm deleteUser={deleteUser} users={usersTable.users}/>}/>
          <Route path="/addExpense" element={<AddExpenseForm addExpense={addExpense} users={usersTable.users} />}/>
          <Route path="/editExpense" element={ <EditExpenseForm 
              editExpense={editExpense} 
              expenses={expensesTable.expenses} 
              users={usersTable.users} />}/>          
          <Route path="/deleteExpense" element={<DeleteExpenseForm deleteExpense={deleteExpense} expenses={expensesTable.expenses} />}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;