import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function UploadDiet() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Text>Upload</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop:25
  }
})