import React, { Component } from 'react'
import { View, Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import * as Animatable from "react-native-animatable";
import Constants from "expo-constants";
import HorizontalList from './components/HorizontalList'
import referenceList from "../components/Reference";

export default class Challenge extends Component {
    render(){
        return(
        <View style={styles.challengeContainer}>
            <ScrollView 
             showsVerticalScrollIndicator={false}
             style={{flex: 1}}
              contentContainerStyle={{width: '100%', height: '120%'}}
              >
                <View style={styles.header}>
                    <Text style = {styles.title}>My Challenges</Text>
                </View>
                <View style = {styles.horizontalList}>
                    <ScrollView 
                    horizontal = {True}
                    contentContainerStyle = {{width: "200%"}}
                    showsHorizontalScrollIndicator={false}
                    >
                        <HorizontalList background = {require('../pictures/calendar.png')} title = 'Schedule' animation = 'bounceInLeft'></HorizontalList>
                        <HorizontalList background = {require('../pictures/notebook.png')} title = 'Diary'animation = 'bounceInLeft'></HorizontalList>
                        <HorizontalList background = {require('../pictures/healthy-food.png')} title = 'Diet'  animation = 'bounceInLeft'></HorizontalList>
                        <HorizontalList background = {require('../pictures/heart-rate.png')} title = 'Workout Plans' animation = 'bounceInLeft'></HorizontalList>
                        <HorizontalList background = {require('../pictures/daily-tasks.png')} title = 'Habit Tracker' animation = 'bounceInLeft'></HorizontalList>
                    </ScrollView>
                </View>
                <View style={styles.referenceView}>
                    <Text style={styles.referenceList}>References</Text>
                </View>
                
                <TouchableOpacity>
                    <Animatable.View
                    animation = 'fadeInRight'
                    duration = {1500}
                    style= {styles.referenceList}
                    >
                        <referenceList
                            image={require("../pictures/notebook.png")}
                            title="Diary"
                            subtitle="Unlocking thoughts, one page at a time"
                        />
                    </Animatable.View>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Animatable.View
                    animation = 'fadeInLeft'
                    duration = {1500}
                    style= {styles.referenceList}
                    >
                        <referenceList
                            image={require("../pictures/healthy-food.png")}
                            title="Diet"
                            subtitle="Eat well, feel well"
                        />
                    </Animatable.View>
                </TouchableOpacity>
               
                <TouchableOpacity>
                    <Animatable.View
                    animation = 'fadeInRight'
                    duration = {1500}
                    style= {styles.referenceList}
                    >
                        <referenceList
                            image={require("../pictures/heart-rate.png")}
                            title="Workouts"
                            subtitle="Push through the sweat, embrace the burn"
                        />
                    </Animatable.View>
                </TouchableOpacity>
                
            </ScrollView>
        </View>
        );      
    }
}

const styles = StyleSheet.create({
    challengeContainer:{
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 100,
        paddingHorizontal: 20,
    },  
    title:{
        fontSize: 38,
        letterSpacing: -0.5,
        fontWeight: "bold",
        color:"#1B1B2F",
    },
    horizontalList:{  
        height: 250,
        width: "100%",     
    },
    referenceText:{
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        letterSpacing: -0.5,
        color: '#1B1B2F',
    },

    referenceList:{
        height: 85,
        width: '100',
        alignSelf: 'center',
        borderRadius: 18,
        marginBottom: 10,
        backgroundColor: "#F4F9FC",       
    }
});
