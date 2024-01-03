import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Ionicons } from "@expo/vector-icons";

import ManageExpense from "../Expenses/screens/ManageExpense";
import RecentExpenses from "../Expenses/screens/RecentExpenses";
import AllExpenses from "../Expenses/screens/AllExpenses";
import { GlobalStyles } from "../Expenses/constants/styles";
import IconButton from "../Expenses/components/UI/IconButton";
import ExpensesContextProvider from "../Expenses/store/expenses-context";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function ExpensesOverview() {
  return (
    <TopTab.Navigator initialRouteName="RecentExpenses" screenOptions={{
      tabBarStyle: {backgroundColor: "white"},
      tabBarIndicatorStyle: {backgroundColor: GlobalStyles.colors.mountbatten},
      tabBarInactiveTintColor: GlobalStyles.colors.cherry,
      tabBarActiveTintColor: GlobalStyles.colors.mountbatten,
  
    }}>
      <TopTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBatLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={20} />
          ),
        }}
      />
      <TopTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBatLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={20} />
          ),
        }}
      />
    </TopTab.Navigator>
  );
}

export default function Expense() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.mountbatten},
        headerTintColor: "white",
        headerTitleStyle: {fontSize: 24}
      }}>
        <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={({ navigation, route }) => ({
          headerTitle: "Expenses",
          headerTintColor:"white",
          headerRight: ({tintColor}) => {
            return <IconButton name="add" color={tintColor} size={24} onPress={() => {
                navigation.navigate("ManageExpense");
            }}/>
          }
        })}/>
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
      </ExpensesContextProvider>
    </>
  );
}