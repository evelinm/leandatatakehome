
export default function generateCompanyExpensesTable(expenses){
    const adder = (prevVal, currVal) => prevVal + currVal;
 
    return ({
      companyExpenses: [
        {
          category: "food", 
          totalExpenses: expenses.expenses
            .filter(e => e.category === "food")
            .map( e => e.cost)
            .reduce( adder, 0)
        },
        {
          category: "travel", 
          totalExpenses: expenses.expenses
            .filter(e => e.category === "travel")
            .map( e => e.cost)
            .reduce( adder, 0)
        },
        {
          category: "health", 
          totalExpenses: expenses.expenses
            .filter(e => e.category === "health")
            .map( e => e.cost)
            .reduce( adder, 0)
        },
        {
          category: "supplies", 
          totalExpenses: expenses.expenses
            .filter(e => e.category === "supplies")
            .map( e => e.cost)
            .reduce( adder, 0)
        }
      ]
    });
  }