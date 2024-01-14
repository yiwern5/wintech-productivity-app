import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Pressable } from 'react-native';
import {useState,useEffect} from 'react';
import {AntDesign} from '@expo/vector-icons'
import {getFirestore,updateDoc,doc,deleteDoc} from "firebase/firestore"
import {db} from '../../firebase'

const ShoppingItem = (props) => {

  const[isChecked,setisChecked] = useState(props.isChecked);

  const updateIsChecked = async() => {
    const todoRef = doc(db,'title',props.id);

    await updateDoc(todoRef,{
        isChecked: isChecked,
    });
  };

  const deleteTodo = async() => {
    await deleteDoc(doc(db, "title", props.id));
    props.getToDo();
  };

  useEffect (() => {
    updateIsChecked();
},[isChecked])

  return (
    <View style={styles.container}>
      <Pressable onPress={() =>setisChecked(!isChecked)}>
        {
        isChecked ? (<AntDesign name="checksquare" size={24} color="black" />
        ) : (<AntDesign name="checksquareo" size={24} color="black" />)
        }
      </Pressable>

      <Text style={styles.title}>{props.title}</Text>

      <Pressable onPress={deleteTodo}>
      <AntDesign name="delete" size={24} color="black" />
      </Pressable>

    </View>
  );
};

export default ShoppingItem;

const styles = StyleSheet.create({
  container: {

    flexDirection: "row",
    backgroundColor: '#FFCAD4',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
  },

  title: {
    flex: 1,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: '500',
  }
});