import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Progress from 'react-native-progress';
import Colors from '../constants/Colors';
import { Entypo, AntDesign } from '@expo/vector-icons';
import MealCard from '../components/Diet/MealCard';
import { db } from "../firebase";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';

export default function Diet() {
  const [mealList, setMealList] = useState([]);
  const [totalIntake, setTotalIntake] = useState(1800);
  const navigation = useNavigation();
  const {user} = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const intake = mealList.reduce((sum, item) => sum + item.calories, 0); 
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

  useFocusEffect(()=>{
    getMealList();
  });

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

  const handleChangeIntake = () => {
    let userInput = '';
  
    // Show an alert with a text input
    Alert.prompt(
      'Change Total Intake',
      'Enter your desired intake:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (input) => {
            // Handle the user input here
            if (input) {
              userInput = input;
              setTotalIntake(Number(userInput));
            }
          },
        },
      ],
      'plain-text',
      '', // Default value for the text input
      'numeric' // Specify the keyboard type (optional)
    );
  };
  
  return mealList&&(
    <View>
      <View style={styles.container}>
        <Text style={styles.title}>Diet</Text>
      </View>

      <TouchableOpacity style={{alignItems:'center'}} onPress={handleChangeIntake}>
        <Progress.Circle size={200} animated={false} progress={intake/totalIntake} 
          color={intake/totalIntake<=1?Colors.tertiary:Colors.red} unfilledColor={Colors.platinum} 
          borderWidth={0} thickness={25} strokeCap='round'
          showsText={true} formatText={(intake)=>(
          <Text style={{ textAlign: 'center' }}>
            <Text style={{ color: Colors.tertiary, fontSize: 46 }}>
              {Math.ceil(intake*totalIntake)}
            </Text>
            {"\n"}
            <Text style={{ color: 'black', fontSize: 24 }}>
              kcal
            </Text>
          </Text>
        )}
          textStyle={{color:Colors.black, fontWeight:'bold'}}
        />
      </TouchableOpacity>

      <View style={styles.rowButton}>
        <View>
          <TouchableOpacity style={styles.b1} onPress={()=>navigation.navigate('UploadDiet')}>
            <Entypo name="camera" size={38} color="black" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Upload</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.b2} onPress={()=>navigation.navigate('AddDiet')}>
            <AntDesign name="pluscircleo" size={38} color="black" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>Add</Text>
        </View>
        <View>
          <TouchableOpacity style={styles.b3} onPress={()=>navigation.navigate('ViewDiet')}>
            <AntDesign name="book" size={38} color="black" />
          </TouchableOpacity>
          <Text style={styles.buttonText}>View</Text>
        </View>
      </View>

      <Text style={styles.mealTitle}>Today's Meal</Text>

      {mealList.length === 0 ?
      <Text style={styles.empty}>No meals yet...</Text>
      :
      <FlatList 
      data={mealList}
      horizontal={true} showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 5}}
      renderItem={({item})=>(
        <MealCard item={item}/>
      )}
      />
      }

      

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
  },
  empty: {
    textAlign:'center',
    margin:100,
    fontSize:18,
    fontWeight:'500',
    color:Colors.tertiary
  }
})