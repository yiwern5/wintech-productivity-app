import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

export default function DiaryProgress() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Diary</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:Colors.secondary, 
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