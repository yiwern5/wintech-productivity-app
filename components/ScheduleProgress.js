import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function ScheduleProgress() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Schedule</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.primary, 
        width:150, 
        height:150, 
        borderRadius:20, 
        justifyContent:'center'
    },
    title: {
      fontSize:16, 
      fontWeight:'800', 
      textAlign:'center',
      color:Colors.tertiary
    }
})