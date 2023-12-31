import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';

export default function ViewCard({item}) { 
  const timestamp = item.time;
  const date = new Date(timestamp.seconds*1000);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

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

        <View style={styles.textcontainer}>
            <Text style={styles.foodname}>{item.name}</Text>
            <View style={styles.row}>
                <View>
                    <View style={styles.icons}>
                        <MaterialCommunityIcons name="fire" size={22} color={Colors.primary} style={{marginRight:10}}/>
                        <Text style={styles.text}>{item.calories} kcal</Text>
                    </View>

                    <View style={styles.icons}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={Colors.secondary} style={{marginRight:11}}/>
                        <Text style={styles.text}>{item.servingSize}g</Text>
                    </View>
                </View>

                <View>
                    <View style={styles.icons}>
                        <Ionicons name="time" size={20} color={Colors.tertiary} style={{marginRight:10}}/>
                        <Text style={styles.text}>{item.type}</Text>
                    </View>

                    <View style={styles.icons}>
                        <FontAwesome name="calendar-o" size={20} color={Colors.tertiary} style={{marginRight:11}} />
                        <Text style={styles.text}>{formattedDate}</Text>
                    </View>
                </View>

            </View>
        </View>

        <View style={styles.nutrientsRow}>
            <View style={styles.nutrients}>
                <View style={styles.c1}>
                    <Text style={styles.nutrienttext}>{item.carbs}g</Text>
                </View>
                <Text style={styles.nutrienttext2}>Carbs</Text>
            </View>

            <View style={styles.nutrients}>
                <View style={styles.c2}>
                    <Text style={styles.nutrienttext}>{item.protein}g</Text>
                </View>
                <Text style={styles.nutrienttext2}>Protein</Text>
            </View>

            <View style={styles.nutrients}>
                <View style={styles.c1}>
                    <Text style={styles.nutrienttext}>{item.fat}g</Text>
                </View>
                <Text style={styles.nutrienttext2}>Fat</Text>
            </View>

            <View style={styles.nutrients}>
                <View style={styles.c2}>
                    <Text style={styles.nutrienttext}>{item.fiber}g</Text>
                </View>
                <Text style={styles.nutrienttext2}>Fiber</Text>
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
        width:'auto'
    },
    pic: {
        height:200, 
        width:'100%', 
        borderTopLeftRadius:20, 
        borderTopRightRadius:20
    },
    icons: {
        display:'flex',
        flexDirection:'row'
    },
    textcontainer: {
        padding:15
    },
    foodname: {
        fontSize:22, 
        fontWeight:'bold'
    },
    row: { 
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:7
    },
    text: {
        fontSize:15, 
        fontWeight:'500'
    },
    nutrientsRow: {
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between',
        marginTop:-15,
        marginBottom:5
    },
    nutrients: {
        alignItems:'center'
    },
    nutrienttext: {
        fontSize:20,
        fontWeight:'600'
    },
    nutrienttext2: {
        fontWeight:'500',
        marginTop:3
    },
    c1: {
        backgroundColor:Colors.primary, 
        height:70, 
        width:70, 
        borderRadius:99, 
        alignItems:'center', 
        justifyContent:'center'
    },
    c2: {
        backgroundColor:Colors.secondary, 
        height:70, 
        width:70, 
        borderRadius:99, 
        alignItems:'center', 
        justifyContent:'center'
    },
    selected: {
        marginVertical:10, 
        marginHorizontal:10, 
        backgroundColor:Colors.primary, 
        borderRadius:20, 
        width:'auto',
        height:405,
        alignItems:'center',
        paddingVertical:150,
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