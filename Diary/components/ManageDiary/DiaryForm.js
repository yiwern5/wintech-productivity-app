import React from "react";
import { useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";
import * as ImagePicker from 'expo-image-picker';


import Button from "../UI/Button";
import Input from "./Input";
import { useUser } from "@clerk/clerk-expo";


function DiaryForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [imageIsValid, setImageIsValid] = useState(true);
  const [inputs, setInputs] = useState({
    title: {
      value: defaultValues ? defaultValues.title : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    entry: {
      value: defaultValues ? defaultValues.entry : "",
      isValid: true,
    },
    mood: {
      value: defaultValues ? defaultValues.mood : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function imageChangedHandler(updatedImage) {
    setImage(updatedImage);
    setImageIsValid(true);
  }

  function submitHandler() {
    const diaryData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      entry: inputs.entry.value,
      mood: inputs.mood.value,
      image: image ? image.uri : null,
      email: user.primaryEmailAddress.emailAddress,
    };

    const titleIsValid = diaryData.title.trim().length > 0;
    const dateIsValid = diaryData.date.toString() !== "Invalid Date";
    const entryIsValid = diaryData.entry.trim().length > 0;
    const moodIsValid = diaryData.mood.trim().length == 2;
    const imageIsValid = diaryData.image !== null && diaryData.image !== undefined;

    if (!titleIsValid || !dateIsValid || !entryIsValid || !imageIsValid || !moodIsValid) {
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          entry  : {
            value: curInputs.entry.value,
            isValid: entryIsValid,
          },
          mood: {
            value: curInputs.mood.value,
            isValid: moodIsValid,
          },
        };
      });
      setImageIsValid(imageIsValid);
      return;
    }

    onSubmit(diaryData);
  }

  const pickImage = async (onImageChanged) => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!response.canceled) {
      const source = response.assets[0];
      onImageChanged(source);
      setImage(source);
      setImageIsValid(true);
    }
  };

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.entry.isValid ||
    !imageIsValid ||
    !inputs.mood.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Diary Entry</Text>
      <Input
        label="Title"
        invalid={!inputs.title.isValid}
        textInputConfig={{
          multiline: false,
          onChangeText: inputChangedHandler.bind(this, "title"),
          value: inputs.title.value,
        }}
        />
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            placeholderTextColor: "grey",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Your mood today"
          invalid={!inputs.mood.isValid}
          textInputConfig={{
            placeholder: "Select one emoji",
            placeholderTextColor: "grey",
            maxLength: 2,
            onChangeText: inputChangedHandler.bind(this, "mood"),
            value: inputs.mood.value,
          }}
        />
      </View>
      <Input
        label="How was your day?"
        invalid={!inputs.entry.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "entry"),
          value: inputs.entry.value,
        }}
      />
      { image ? (
          <TouchableOpacity onPress={() => pickImage(imageChangedHandler)}>
            <View style={{overflow:'hidden'}}>
              <Image source={{ uri: image.uri }} style={styles.imagecontainer}/>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.imagecontainer} onPress={() => pickImage(imageChangedHandler)}>
            <Text>Add an image of your day!</Text>
          </TouchableOpacity>
        )}
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values - please check your entered data!
        </Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default DiaryForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginVertical: 18,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.crimson,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    minWidth: 120,
    marginHorizontal: 20,
  },
  imagecontainer: {
    backgroundColor:GlobalStyles.colors.platinum,
    marginTop:10,
    height:250,
    marginBottom:20,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
});
