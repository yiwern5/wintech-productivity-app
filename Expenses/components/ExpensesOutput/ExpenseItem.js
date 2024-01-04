import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 10,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: GlobalStyles.colors.pink,
    elevation: 4,
    shadowColor: GlobalStyles.colors.thistle,
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 4,
    shadowOpacity: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textBase: {
    fontSize: 14,
    color: "black",
    marginRight: 100
  },
  description: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16
  },
  amountContainer: {
    position: "absolute",
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    minWidth: 80,
  },
  amount: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
