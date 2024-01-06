import { View, Text, StyleSheet, TouchableOpacity, Image, Button, ImageBackground} from 'react-native'
import React, { useRef } from 'react'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync } from 'expo-image-manipulator';

export default function UploadDiet() {
  const navigation = useNavigation();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const storage = getStorage();
  const storageRef = ref(storage, 'meal');
  const [image, setImage] = useState(null);
  const cameraRef = useRef(null);

  const pickImage = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!response.canceled) {
      const source = response.assets[0];
      setImage(source);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      try { 
        const picture = await cameraRef.current.takePictureAsync();
        // Calculate the cropped area
        const width = picture.width;
        const height = picture.height;
        const shorterSide = Math.min(width, height);
        const startingHeight = (height - shorterSide) / 2;
        const startingWidth = (width - shorterSide) / 2;
        // Cropping image
        const cropped_img = await manipulateAsync(
          picture.uri,
          [{crop: {height: shorterSide, originX: startingWidth , originY:startingHeight, width:shorterSide}}],
          );
        setImage(cropped_img);
      } catch (e) {
        alert(e)
      }
    }
  };

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

    {image ?
      (<View>
          <TouchableOpacity onPress={() => {setImage(null)}}>
            <Ionicons name="arrow-back" size={35} color="black" />
          </TouchableOpacity>

          <View style={{overflow:'hidden'}}>
            <Image source={{ uri: image.uri }} style={styles.preview}/>
          </View>

          <TouchableOpacity style={styles.analysebutton}>
            <Text style={styles.analysetext}>Analyse</Text>
          </TouchableOpacity>
      </View>
      )
      :
      (
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate("Diet")}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>

        <View style={styles.camcontainer}>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.flipbutton} onPress={toggleCameraType}>
                <MaterialIcons name="flip-camera-ios" size={35} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>

        <View style={styles.row}>

          <View>
            <MaterialIcons name="photo-album" size={40} color="transparent" />
          </View> 

          <TouchableOpacity style={styles.shootbutton} onPress={()=>takePicture()}>
            <FontAwesome name="camera" size={38} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.albumbutton} onPress={pickImage}>
            <MaterialIcons name="photo-album" size={40} color="black" />
            <Text style={styles.album}>Album</Text>
          </TouchableOpacity> 
        </View>
      </View>
    )}
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
    height:330,
    width:340,
    justifyContent:'center',
    alignSelf:'center',
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
    alignItems:'center',
    marginLeft:10
  },
  row: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:20
  },
  albumbutton: {
    marginRight:10
  },
  album: {
    fontSize:12,
    textAlign:'center',
    fontWeight:'bold'
  },
  preview: {
    height:330, 
    width:340,
    marginTop:100, 
    resizeMode:'cover', 
    alignSelf:'center',
    borderRadius:20
  },
  analysebutton: {
    backgroundColor:Colors.tertiary, 
    width:120, 
    padding:20, 
    borderRadius:20, 
    alignItems:'center', 
    alignSelf:'center', 
    marginTop:50
},
analysetext: {
    fontSize:18, 
    fontWeight:'bold', 
    color:Colors.white
}
})