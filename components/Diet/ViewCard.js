import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ViewCard({item}) { 
  return item&&(
    <View style={styles.container}>
        
        <Image style={styles.pic} source={{uri:item.image}} />

        <View style={styles.textcontainer}>
            <Text style={styles.foodname}>{item.name}</Text>
            <View style={styles.row}>
                <View style={styles.icons}>
                    <MaterialCommunityIcons name="fire" size={22} color={Colors.primary} style={{marginRight:3}}/>
                    <Text style={styles.text}>{item.calories} kcal</Text>
                </View>

                <View style={styles.icons}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={Colors.secondary} style={{marginRight:3}}/>
                    <Text style={styles.text}>{item.servingSize}g</Text>
                </View>

                <View style={styles.icons}>
                    <Ionicons name="time" size={20} color={Colors.tertiary} style={{marginRight:3}}/>
                    <Text style={styles.text}>{item.type}</Text>
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
    }
})