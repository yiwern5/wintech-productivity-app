import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useUser } from "@clerk/clerk-expo";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);
  const { user } = useUser();
  const expenses = expensesCtx.expenses.filter((expense) => {
    return expense.email == user.primaryEmailAddress.emailAddress;
  })

  return (
    <ExpensesOutput
      expenses={expenses}
      expensesPeriod="Total"
      fallbackText="No registered expenses found!"
    />
  );
}

export default AllExpenses;
