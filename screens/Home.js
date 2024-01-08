import React, { Component } from "react";
import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import Day from "../components/Day";
import ChallengeCard from "../components/ChallengeCard";
import ProjectCard from "../components/ProjectCard";
import Colors from "../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import ScheduleProgress from "../components/ScheduleProgress";
import DiaryProgress from "../components/DiaryProgress";
import DietProgress from "../components/DietProgress";
import ExpenseProgress from "../components/ExpenseProgress";

export default function Home() {
  const {user} = useUser();
  const navigation = useNavigation();
    return (
      <View style={styles.homeContainer}>
        <View style={styles.firstContainer}>
          <View style={styles.firstSection}></View>
          <View style={styles.secondSection}>
            <View style={styles.userSection}>
              <Text style={styles.name}>Hi {user.fullName}</Text>
              <Image style={styles.pfp} source={{uri:user?.imageUrl}}/>
            </View>
            <Text style={styles.subtitle}>Here is your progress</Text>
          </View>
          <View style={styles.thirdSection}>
            <ImageBackground
              source={require("../assets/lifesync.png")}
              style={{
                width: "100%",
                height: 250,
              }}
            />
          </View>
          <View style={styles.fourthSection}>
            <Day dayname="Sun" />
            <Day dayname="Mon" />
            <Day dayname="Tue" />
            <Day dayname="Wed" />
            <Day dayname="Thu" />
            <Day dayname="Fri" />
            <Day dayname="Sat" />
          </View>
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.line}></View>
          <View style={styles.progress}>
            <Text style={styles.textone}>My Progress</Text>
            <View style={styles.row}>
              <ScheduleProgress />  
              <DiaryProgress />
            </View>
            <View style={styles.row}>
              <DietProgress />
              <ExpenseProgress />
            </View>
          </View>
        </View>
      </View>
)}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  firstContainer: {
    flex: 1,
  },
  firstSection: {
    flex: 1,
  },
  secondSection: {
    flex: 0.8,
    marginLeft: 35,
  },
  userSection: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  thirdSection: {
    flex: 2.5,
    justifyContent: "center",
  },
  fourthSection: {
    flex: 0.5,
    color: "#f6f6f6",
    flexDirection: "row",
  },
  secondContainer: {
    flex: 1.5,
    backgroundColor: "#f6f6f6",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  name: {
    fontSize: 36,
    color: "#f6f6f6",
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  pfp: {
    width:50, 
    height:50, 
    borderRadius:99,
    marginRight:25
  },
  subtitle: {
    fontSize: 20,
    color: "#f6f6f6",
  },
  line: {
    width: "20%",
    height: 8,
    backgroundColor: "#BEC4C9",
    borderRadius: 4,
    marginVertical: "4%",
    left: "40%",
  },
  progress: {
    paddingHorizontal:40,
    paddingVertical:10
  },
  textone: {
    fontSize: 20,
    color: "#1b1b2f",
    letterSpacing: -0.5,
    marginBottom:15
  },
  cards: {
    flex: 1,
    width: "90%",
    marginTop: 10,
    marginHorizontal: 30,
  },
  row: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:15
  }
});