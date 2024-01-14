import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ManageDiary from "../Diary/screens/ManageDiary";
import ViewEntries from "../Diary/screens/ViewEntries";
import { GlobalStyles } from "../Expenses/constants/styles";
import IconButton from "../Expenses/components/UI/IconButton";
import DiaryContextProvider from "../Diary/store/diary-context";

const Stack = createNativeStackNavigator();

export default function Diary() {
  return (
    <>
      <StatusBar style="light" />
        <Stack.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyles.colors.mountbatten},
        headerTintColor: "white",
        headerTitleStyle: {fontSize: 24}
      }}>
        <Stack.Screen name="ViewEntries" component={ViewEntries} options={({ navigation, route }) => ({
          headerTitle: "My Diary",
          headerTintColor:"white",
          headerRight: ({tintColor}) => {
            return <IconButton name="add" color={tintColor} size={24} onPress={() => {
                navigation.navigate("ManageDiary");
            }}/>
          }
        })}/>
            <Stack.Screen
              name="ManageDiary"
              component={ManageDiary}
              options={{
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
    </>
  );
}