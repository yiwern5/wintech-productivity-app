import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import ChickenRice from '../../assets/singapore-chicken-rice.jpg';
import Colors from '../../constants/Colors';
import axios from 'axios';

export default function MealCard({item}) { 
  const query = '3lb carrots and a chicken sandwich';

  const response = axios.get('https://api.calorieninjas.com/v1/nutrition?query=', {
        params: {
          query: query
        },
        headers: {
          'X-Api-Key': 'Lzd0pkAjqi2jje1tnfx4bA==tZEohUdw55MBmvp7'
        },
      });

  (response.data)&&console.log(response.data);
  return item&&(
    <View style={styles.container}>
        
        <Image style={styles.pic} source={ChickenRice} />

        <View style={styles.text}>
            <Text style={styles.name}>{item.Name}</Text>

            <View style={styles.row}>
                <View>
                <Text style={styles.type}>{item.Type}</Text>
                </View>
                <View>
                <Text style={styles.cal}> · {item.Calories} kcal</Text>
                </View>
            </View>
        </View>

    </View>
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
  }
})