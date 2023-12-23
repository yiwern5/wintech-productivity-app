import { View, Text, Image } from 'react-native'
import React from 'react'
import ChickenRice from '../../assets/singapore-chicken-rice.jpg';
import Colors from '../../constants/Colors';

export default function MealCard({item}) {
  return (
    <View style={{marginVertical:10, marginHorizontal:10, backgroundColor:Colors.white, borderRadius:20, width:250}}>
        
        <Image style={{height:160, width:'100%', borderTopLeftRadius:15, borderTopRightRadius:15}} source={ChickenRice} />

        <View style={{paddingHorizontal:20, paddingTop:10, paddingBottom:20}}>
            <Text style={{fontSize:22, fontWeight:'bold'}}>Chicken Rice</Text>

            <View style={{display:'flex', flexDirection:'row', alignItems:'center', paddingTop:5}}>
                <View>
                <Text style={{fontSize:16, fontWeight:'bold', color:Colors.tertiary}}>Breakfast</Text>
                </View>
                <View>
                <Text style={{fontSize:16}}> · 250 kcal</Text>
                </View>
            </View>
        </View>

    </View>
  )
}