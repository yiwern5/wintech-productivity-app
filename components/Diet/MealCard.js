import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

export default function MealCard({item}) { 
  const [isFocused, setIsFocused] = useState(false);
  const handlePress = () => {
    setIsFocused(!isFocused);
  };
  const deleteItem = async () => {
    try {
      await deleteDoc(doc(db, "Meal", item.id));
      Alert.alert("Meal deleted!");
    } catch (error) {
      Alert.alert('Error deleting item:', error);
    }
  }
  return item&&(
    <TouchableOpacity onPress={handlePress}>
      {isFocused
      ?(
      <View style={styles.selected}>
        <Text style={styles.delete}>Do you want to delete this meal?</Text>
        <View style={styles.tickcross}>
          <TouchableOpacity style={{marginRight:15}} onPress={handlePress}>
            <AntDesign name="close" size={70} color="red" />
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteItem}>
            <AntDesign name="check" size={70} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      ):(
        <View style={styles.container}>
          
          <Image style={styles.pic} source={{uri:item.image}} />

          <View style={styles.text}>
              <Text style={styles.name}>{item.name}</Text>

              <View style={styles.row}>
                  <View>
                  <Text style={styles.type}>{item.type}</Text>
                  </View>
                  <View>
                  <Text style={styles.cal}> · {item.calories} kcal</Text>
                  </View>
              </View>
          </View>

        </View>
      )}
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical:10, 
    marginHorizontal:10, 
    backgroundColor:Colors.white, 
    borderRadius:20, 
    width:250
  },
  pic: {
    height:160, 
    width:'100%', 
    borderTopLeftRadius:15, 
    borderTopRightRadius:15
  },
  text: {
    paddingHorizontal:20, 
    paddingTop:10, 
    paddingBottom:20
  },
  name: {
    fontSize:22, 
    fontWeight:'bold'
  },
  row: {
    display:'flex', 
    flexDirection:'row', 
    alignItems:'center', 
    paddingTop:5
  },
  type: {
    fontSize:16, 
    fontWeight:'bold', 
    color:Colors.tertiary
  },
  cal: {
    fontSize:16
  },
  selected: {
    marginVertical:10, 
    marginHorizontal:10, 
    backgroundColor:Colors.primary, 
    borderRadius:20, 
    width:250,
    height:240,
    alignItems:'center',
    paddingVertical:60,
    paddingHorizontal:20
  },
  delete: {
    fontSize:20, 
    fontWeight:'bold', 
    textAlign:'center', 
    alignSelf:'center'
  },
  tickcross: {
    display:'flex', 
    flexDirection:'row', 
    padding:10
  }
})