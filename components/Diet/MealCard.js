import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';

export default function MealCard({item}) { 
  return item&&(
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