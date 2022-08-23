import users from "../temp-backend/users";
import expenses from "../temp-backend/expenses";

export default function generateUsersTable(){
  const adder = (prevVal, currVal) => prevVal + currVal;

  return (
    {
      users: users.users.map( user => ({...user, 
        totalExpenses: expenses.expenses
          .filter( e => e.fullName === `${user.firstName} ${user.lastName}` )
          .map( e => e.cost)
          .reduce( adder, 0)
      }))
    }
  );
}