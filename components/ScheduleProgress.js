import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {useState,useEffect} from 'react';
import {db} from '../firebase'
import {collection, addDoc,getDocs,deleteDoc,doc,query,where} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';

export default function App() {
  const [todoList,settodoList] = useState([]);
  const {user} = useUser();
  const email = user.primaryEmailAddress.emailAddress;

  const getToDo = async() => {
    const querySnapshot = await getDocs(query(collection(db, "title"), where("user", "==", email)));

    settodoList(
      querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}))
      );
  };

  const deleteTodoList = async() => {
    const q = query(collection(db, "title"), where("user", "==", email))
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "title", item.id)))
    getToDo();
  };

  falseCount= todoList.filter(function(item){
    return item.isChecked == false;
 }).map(function({title, isChecked,user}){
     return {title, isChecked, user};
 });

  useFocusEffect(() => {
    getToDo();
  })

  return (
    <View style={styles.container}>
        <Text style={styles.number}>{falseCount.length}</Text>
        <Text style={styles.left}>tasks left</Text>      
        <Text style={styles.title}>To-do List</Text>
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
    number: {
      fontSize:55,
      fontWeight:'bold',
      textAlign:'center',
      color:Colors.white,
      marginTop:10
    },
    left: {
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
