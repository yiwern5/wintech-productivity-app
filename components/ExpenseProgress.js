import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { useContext, useState, useEffect } from "react";

import ErrorOverlay from '../Expenses/components/UI/ErrorOverlay';
import LoadingOverlay from '../Expenses/components/UI/LoadingOverlay';
import { ExpensesContext } from '../Expenses/store/expenses-context';
import { fetchExpenses } from '../Expenses/util/http';
import { getDateMinusDays } from '../Expenses/util/date';
import { useUser } from '@clerk/clerk-expo';

export default function ExpenseProgress() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { user } = useUser();

  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();

        expensesCtx.setExpenses(expenses);

      } catch (error) {
        setError("Could not fetch expenses!");
      }

      setIsFetching(false);
      //setFetchedExpenses(expenses);
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date1DayAgo = getDateMinusDays(today, 0);

    return expense.date >= date1DayAgo && expense.date <= today && expense.email == user.primaryEmailAddress.emailAddress;
  });

  const expensesSum = recentExpenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.amount}>${expensesSum.toFixed(2)}</Text>
      <Text style={styles.spent}>spent</Text>
      <Text style={styles.title}>Expense</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.primary, 
        width:150, 
        height:150, 
        borderRadius:20, 
        justifyContent:'center'
    },
    amount: {
      fontSize:32,
      fontWeight:'bold',
      textAlign:'center',
      color:Colors.white,
      marginTop:30
    },
    spent: {
      fontSize:22, 
      fontWeight:'bold', 
      textAlign:'center',
      marginBottom:15
    },
    title: {
      fontSize:16, 
      fontWeight:'800', 
      textAlign:'center',
      color:Colors.tertiary
    }
})