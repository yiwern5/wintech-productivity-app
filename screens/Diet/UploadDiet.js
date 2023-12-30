import { View, Text, StyleSheet, TouchableOpacity, Image, Button} from 'react-native'
import React from 'react'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import Colors from '../../constants/Colors';

export default function UploadDiet() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  console.log(permission);

  if (!permission) {
    return <View />
  }

  if (permission.granted === false) {
    return <View>
        <Text style={{ textAlign: 'center', margin:50, fontSize:12 }}>
          {'Permission is required to use the camera.\n\nPlease also check your privacy settings if you denied access for the first time'}
          </Text>

        <View style={{flexDirection:'row', justifyContent:'center'}}>

          <TouchableOpacity onPress={requestPermission} style={{ textAlign: 'center', alignSelf:'center',marginHorizontal:10 }} activeOpacity={0.2} underlayColor='transparent'>
            <Text> Allow camera permission </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ textAlign: 'center', alignSelf:'center', marginHorizontal:10}} activeOpacity={0.2} underlayColor='transparent'>
            <Text>Go back</Text>
          </TouchableOpacity>

        </View>

        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Image
                source={images.focus}
                resizeMode="contain"
                style={{
                    marginTop: "-55%",
                    width: 200,
                    height: 200,
                }}
            />
        </View>

      </View>
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return permission.granted === true &&(
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("Diet")}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>

      <View style={styles.camcontainer}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.flipbutton} onPress={toggleCameraType}>
              <MaterialIcons name="flip-camera-ios" size={35} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </Camera>
      </View>

      <View style={styles.row}>
        <View style={styles.shootbutton}>
          <FontAwesome name="camera" size={38} color={Colors.white} />
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop:25,
    backgroundColor: 'transparent'
  },
  camcontainer: {
    height:300,
    justifyContent:'center',
    marginTop:100,
    borderRadius:20
  },
  camera: {
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'transparent',
    borderRadius:20
  },
  flipbutton: {
    backgroundColor:"transparent", 
    width:60, 
    height:60, 
    justifyContent:'center', 
    alignItems:'center', 
  },
  shootbutton: {
    backgroundColor: Colors.tertiary,
    borderRadius:99,
    width:70, 
    height:70, 
    justifyContent:'center',
    alignItems:'center'
  },
  row: {
    alignItems:'center',
    marginTop:20
  }
})