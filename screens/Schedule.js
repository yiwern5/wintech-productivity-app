import { StatusBar } from 'expo-status-bar';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, SafeAreaView,Pressable,TextInput,FlatList,ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import ShoppingItem from './Todo/shoppingItem'
import {AntDesign} from '@expo/vector-icons'
import {db} from '../firebase'
import {collection, addDoc,getDocs,deleteDoc,doc,query,where} from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo';

export default function App() {
  const [title,setTitle] = useState("");
  const [todoList,settodoList] = useState([]);
  const {user} = useUser();
  const email = user.primaryEmailAddress.emailAddress;

  const addToDo = async() => {
    try {
      const docRef = await addDoc(collection(db, "title"), {
        title: title,
        isChecked: false,
        user: email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    getToDo();
  }

  const getToDo = async() => {
    const querySnapshot = await getDocs(query(collection(db, "title"), where("user", "==", email)));

    settodoList(
      querySnapshot.docs.map((doc) => ({...doc.data(),id:doc.id}))
      );
    
    console.log(todoList);
  };

  const deleteTodoList = async() => {
    const q = query(collection(db, "title"), where("user", "==", email))
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "title", item.id)))
    getToDo();
  };

  useEffect(() => {
    getToDo();
  },[])

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.heading}>To-do List : {todoList.length} </Text>

        <Pressable onPress={deleteTodoList}>
          <AntDesign name="delete" size={28} color="black" />
        </Pressable>
      
      </View>
      
      <FlatList
      data={todoList}
      renderItem={({item}) =><ShoppingItem title={item.title} isChecked={item.isChecked} id={item.id} getToDo={getToDo}/>}
      keyExtractor={(item)=>item.id}
      />
    
    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
      <TextInput 
        placeholder='Press Enter to create to-dos' 
        style={styles.input} 
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={addToDo}
      />

    </KeyboardAvoidingView>

    </SafeAreaView>
  );
  };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
  },
  header:{
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: 45,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  heading:{
    fontSize: 28,
    fontWeight: '700',
    flex: 1,
  },

  input:{
    backgroundColor: '#D8E2DC',
    fontSize: 17,
    width: '90%',
    alignSelf:'center',
    borderRadius: 10,
    height: 60,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

});
