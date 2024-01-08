import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors'
import { db } from '../firebase'
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';

export default function DietProgress() {
  const [mealList, setMealList] = useState([]);
  const {user} = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const intake = mealList.reduce((sum, item) => sum + item.calories, 0); 
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

  const getMealList = async () => {
    try {
      const q = query(collection(db, "Meal"), 
      where("user", "==", email),
      where("time", ">=", today),
      where("time", "<=", endOfDay),
      orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
  
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
      setMealList(data);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useFocusEffect(()=>{
    getMealList();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.cal}>{intake}</Text>
      <Text style={styles.kcal}>kcal</Text>      
      <Text style={styles.title}>Diet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:Colors.secondary, 
      width:150, 
      height:150, 
      borderRadius:20, 
      justifyContent:'center'
    },
    cal: {
      fontSize:55,
      fontWeight:'bold',
      textAlign:'center',
      color:Colors.white,
      marginTop:10
    },
    kcal: {
      fontSize:22, 
      fontWeight:'bold', 
      textAlign:'center',
      marginTop:-10,
      marginBottom:10
    },
    title: {
      fontSize:16, 
      fontWeight:'800', 
      textAlign:'center',
      color:Colors.tertiary
    }
})