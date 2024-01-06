import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Diet from '../screens/Diet';
import UploadDiet from '../screens/Diet/UploadDiet';
import ViewDiet from '../screens/Diet/ViewDiet';
import AddDiet from '../screens/Diet/AddDiet';
import SaveDiet from '../screens/Diet/SaveDiet';

const Stack=createStackNavigator();
export default function DietNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Diet' component={Diet}/>
        <Stack.Screen name='UploadDiet' component={UploadDiet} />
        <Stack.Screen name='AddDiet' component={AddDiet} />
        <Stack.Screen name='ViewDiet' component={ViewDiet} />
        <Stack.Screen name='SaveDiet' component={SaveDiet} />
    </Stack.Navigator>
  )
}