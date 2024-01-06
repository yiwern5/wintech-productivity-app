import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, docs, where, query, orderBy } from "firebase/firestore";
import { db, storage } from '../../firebase';
import ViewCard from '../../components/Diet/ViewCard';
import Colors from '../../constants/Colors';
import { getDownloadURL, ref } from 'firebase/storage';

export default function ViewDiet() {
  const navigation = useNavigation();
  const [mealList, setMealList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const {user} = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  useFocusEffect(()=>{
    getMealList();
  });

  const getMealList = async () => {
    try {
      const q = query(collection(db, "Meal"), 
      where("user", "==", email),
      orderBy("time", "desc"));
      const querySnapshot = await getDocs(q);
  
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  
      setMealList(data);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, 'adddiet.gif');
        getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate("Diet")}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>

      {mealList.length === 0 ?
      <Text style={styles.empty}>No meals yet...</Text>
      :
      <FlatList
      data={mealList}
      contentContainerStyle={{paddingHorizontal: 5}}
      renderItem={({item})=>(
        <ViewCard item={item}/>
      )}
      />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    marginTop:25,
    marginBottom:130
  },
  empty: {
    textAlign:'center',
    marginVertical:250,
    fontSize:18,
    fontWeight:'500',
    color:Colors.tertiary
  }
})