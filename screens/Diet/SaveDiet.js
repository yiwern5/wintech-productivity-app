import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import { db } from '../../firebase';
import { addDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';

export default function SaveDiet() {
    const navigation = useNavigation();
    const route = useRoute();
    const { meal, image, type } = route.params;
    const { user } = useUser();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const name = meal.map(item => capitalizeFirstLetter(item.name)).join(", ");
    const totalCalories = Math.ceil(meal.reduce((sum, item) => sum + item.calories, 0));
    const totalServing = Math.ceil(meal.reduce((sum, item) => sum + item.serving_size_g, 0));
    const totalCarbs = Math.ceil(meal.reduce((sum, item) => sum + item.carbohydrates_total_g, 0));
    const totalProtein = Math.ceil(meal.reduce((sum, item) => sum + item.protein_g, 0));
    const totalFiber = Math.ceil(meal.reduce((sum, item) => sum + item.fiber_g, 0));
    const totalFat = Math.ceil(meal.reduce((sum, item) => sum + item.fat_total_g, 0));

    const save = async () => {
        const data = await addDoc(collection(db, "Meal"), {
            name: name,
            calories: totalCalories,
            servingSize: totalServing,
            carbs: totalCarbs,
            protein: totalProtein,
            fiber: totalFiber,
            fat: totalFat,
            user: user.primaryEmailAddress.emailAddress,
            image: image.uri,
            type: type,
            time: serverTimestamp()
          }).then(()=>navigation.navigate('Diet'));
        
          Alert.alert(`Meal saved!`)
    }

    return meal&&image&&(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="arrow-back" size={35} color="black" />
            </TouchableOpacity>
            <View style={styles.card}>
                <Image source={{ uri: image.uri }} style={styles.pic}/>
                <View style={styles.textcontainer}>
                    <Text style={styles.foodname}>{name}</Text>
                    <View style={styles.row}>
                        <View style={styles.icons}>
                            <MaterialCommunityIcons name="fire" size={22} color={Colors.primary} style={{marginRight:3}}/>
                            <Text style={styles.text}>{totalCalories} kcal</Text>
                        </View>

                        <View style={styles.icons}>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={Colors.secondary} style={{marginRight:3}}/>
                            <Text style={styles.text}>{totalServing}g</Text>
                        </View>

                        <View style={styles.icons}>
                            <Ionicons name="time" size={20} color={Colors.tertiary} style={{marginRight:3}}/>
                            <Text style={styles.text}>{type}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.nutrientsRow}>
                    <View style={styles.nutrients}>
                        <View style={styles.c1}>
                            <Text style={styles.nutrienttext}>{totalCarbs}g</Text>
                        </View>
                        <Text style={styles.nutrienttext2}>Carbs</Text>
                    </View>

                    <View style={styles.nutrients}>
                        <View style={styles.c2}>
                            <Text style={styles.nutrienttext}>{totalProtein}g</Text>
                        </View>
                        <Text style={styles.nutrienttext2}>Protein</Text>
                    </View>

                    <View style={styles.nutrients}>
                        <View style={styles.c1}>
                            <Text style={styles.nutrienttext}>{totalFat}g</Text>
                        </View>
                        <Text style={styles.nutrienttext2}>Fat</Text>
                    </View>

                    <View style={styles.nutrients}>
                        <View style={styles.c2}>
                            <Text style={styles.nutrienttext}>{totalFiber}g</Text>
                        </View>
                        <Text style={styles.nutrienttext2}>Fiber</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.savebutton} onPress={save}>
                    <Text style={styles.savetext}>Save</Text>
                </TouchableOpacity>
            </View>
            {totalServing%100 === 0
            ? <Text style={{padding:5}}>Tip: The default portion size is 100g per food.</Text>
            : null }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding:20,
      marginTop:25
    },
    card: {
        backgroundColor:Colors.white, 
        height:550, 
        borderRadius:20, 
        marginTop:50
    },
    pic: {
        height:250, 
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
        fontSize:25, 
        fontWeight:'bold'
    },
    row: { 
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginTop:7 
    },
    text: {
        fontSize:18, 
        fontWeight:'500'
    },
    nutrientsRow: {
        display:'flex',
        flexDirection:'row',
        padding:10,
        justifyContent:'space-between'
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
        height:80, 
        width:80, 
        borderRadius:99, 
        alignItems:'center', 
        justifyContent:'center'
    },
    c2: {
        backgroundColor:Colors.secondary, 
        height:80, 
        width:80, 
        borderRadius:99, 
        alignItems:'center', 
        justifyContent:'center'
    },
    savebutton: {
        backgroundColor:Colors.tertiary, 
        width:120, 
        padding:20, 
        borderRadius:20, 
        alignItems:'center', 
        alignSelf:'center', 
        position:'absolute', 
        bottom:20
    },
    savetext: {
        fontSize:18, 
        fontWeight:'bold', 
        color:Colors.white
    }
})