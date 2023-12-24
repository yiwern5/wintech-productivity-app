import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import Colors from '../constants/Colors';
import { Entypo, AntDesign } from '@expo/vector-icons';
import MealCard from '../components/Diet/MealCard';
import { db } from "../firebase";
import { collection, getDocs, docs } from "firebase/firestore";

export default function Diet() {
  const intake = 500;
  const totalIntake = 1500;
  const [mealList, setMealList] = useState([]);
  useEffect(()=>{
    getMealList();
  },[])
  const getMealList = async () => {
    await getDocs(collection(db, "Meal"))
            .then((querySnapshot)=>{               
                const Data = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                Data&&setMealList(Data);                
            })
  };
  return mealList&&(
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Diet</Text>
      </View>

      <View style={{alignItems:'center'}}>
        <Progress.Circle size={200} animated={false} progress={intake/totalIntake} 
          color={intake/totalIntake<=1?Colors.tertiary:Colors.red} unfilledColor={Colors.platinum} 
          borderWidth={0} thickness={25} strokeCap='round'
          showsText={true} formatText={(intake)=>(
          <Text style={{ textAlign: 'center' }}>
            <Text style={{ color: Colors.tertiary, fontSize: 46 }}>
              {intake*totalIntake}
            </Text>
            {"\n"}
            <Text style={{ color: 'black', fontSize: 24 }}>
              kcal
            </Text>
          </Text>
        )}
          textStyle={{color:Colors.black, fontWeight:'bold'}}
        />
      </View>

      <View style={styles.rowButton}>
        <View>
          <View style={styles.b1}>
            <Entypo name="camera" size={38} color="black" />
          </View>
          <Text style={styles.buttonText}>Upload</Text>
        </View>
        <View>
          <View style={styles.b2}>
            <AntDesign name="pluscircleo" size={38} color="black" />
          </View>
          <Text style={styles.buttonText}>Add</Text>
        </View>
        <View>
          <View style={styles.b3}>
            <AntDesign name="book" size={38} color="black" />
          </View>
          <Text style={styles.buttonText}>View</Text>
        </View>
      </View>

      <Text style={styles.mealTitle}>Today's Meal</Text>

      <FlatList 
        data={mealList}
        horizontal={true} showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 5}}
        renderItem={({item})=>(
          <MealCard item={item}/>
        )}

      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    padding:20
  },
  title: {
    fontSize: 30,
    fontWeight:'bold'
  },
  rowButton: {
    padding:25, 
    display:'flex', 
    flexDirection:'row',
    justifyContent:'center'
  }, 
  b1: {
    backgroundColor:Colors.primary, 
    borderRadius:20, 
    width:70, 
    height:70, 
    justifyContent:'center', 
    alignItems:'center', 
    marginBottom:5
  }, 
  b2: {
    backgroundColor:Colors.secondary, 
    borderRadius:20, 
    width:70, 
    height:70, 
    justifyContent:'center', 
    alignItems:'center', 
    marginHorizontal:65,
    marginBottom:5
  },
  b3: {
    backgroundColor:Colors.tertiary, 
    borderRadius:20, 
    width:70, 
    height:70,
    justifyContent:'center', 
    alignItems:'center',
    marginBottom:5
  },
  buttonText: {
    fontSize:18, 
    fontWeight:'bold', 
    textAlign:'center'
  },
  mealTitle: {
    fontSize:24, 
    fontWeight:'bold', 
    marginLeft:30
  }
})