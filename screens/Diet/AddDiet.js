import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';

export default function AddDiet() {
  const navigation = useNavigation();
  
  const [query, setQuery] = useState('');
  const [image, setImage] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const handleSearch = async () => {
    const response = await axios.get('https://api.calorieninjas.com/v1/nutrition?query=', {
      params: {
        query: query
      },
      headers: {
        'X-Api-Key': 'Lzd0pkAjqi2jje1tnfx4bA==tZEohUdw55MBmvp7',
      },
    });

    console.log(response.data.items);
    navigation.navigate('SaveDiet',{
      meal:response.data.items,
      image:image,
      type:value
    })
  };

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

  const data = [
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Dinner', value: 'Dinner' },
  ];

  const DropdownComponent = () => {
    return (
      <View style={styles.dropdowncontainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select time' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Ionicons
              style={styles.icon}
              color={isFocus ? Colors.secondary : 'black'}
              name="time"
              size={20}
            />
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={()=>navigation.navigate("Diet")}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>

      {DropdownComponent()}

      { image ?
      <TouchableOpacity onPress={pickImage}>
        <View style={{overflow:'hidden'}}>
          <Image source={{ uri: image.uri }} style={styles.imagecontainer}/>
        </View>
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.imagecontainer} onPress={pickImage}>
        <Text>Add an image of your meal!</Text>
      </TouchableOpacity>
      }

      <View style={styles.addBar}>
        <TextInput placeholder='12oz of beef, salmon and fries'
        value={query}
        onChangeText={(text) => setQuery(text)}
        />
        <TouchableOpacity style={styles.addbutton} onPress={handleSearch}>
          <Ionicons name="ios-add-sharp" size={34} color="white"/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop:25
  },
  addBar: {
    marginLeft:15,
    marginRight:15, 
    backgroundColor:Colors.white, 
    paddingLeft:15, 
    paddingRight:5,
    display:'flex', 
    flexDirection:'row', 
    justifyContent:'space-between', 
    alignItems:'center',
    borderRadius:99,
    height:50
  },
  addbutton: {
    backgroundColor:Colors.secondary, 
    justifyContent:'center', 
    width:40, 
    height:40, 
    borderRadius:99, 
    alignItems:'center'
  },
  imagecontainer: {
    backgroundColor:Colors.platinum,
    marginTop:10,
    height:250,
    marginBottom:20,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  dropdowncontainer: {
    padding:10,
    marginHorizontal:10,
    marginTop:10
  },
  dropdown: {
    height: 45,
    backgroundColor:Colors.white,
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color:'black'
  },
  selectedTextStyle: {
    fontSize: 15,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 15,
  }
})