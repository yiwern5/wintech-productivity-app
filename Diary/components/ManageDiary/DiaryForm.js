import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

import Button from "../UI/Button";
import Input from "./Input";

function DiaryForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {
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
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const diaryData = {
      title: inputs.title.value,
      date: new Date(inputs.date.value),
      entry: inputs.entry.value,
    };

    const titleIsValid = diaryData.title.trim().length > 0;
    const dateIsValid = diaryData.date.toString() !== "Invalid Date";
    const entryIsValid = diaryData.entry.trim().length > 0;

    if (!titleIsValid || !dateIsValid || !entryIsValid) {
      //Alert.alert("Invalid input", "Please check your input values");
      setInputs((curInputs) => {
        return {
          title: { value: curInputs.title.value, isValid: titleIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          entry  : {
            value: curInputs.entry.value,
            isValid: entryIsValid,
          },
        };
      });
      return;
    }

    onSubmit(diaryData);
  }

  const formIsInvalid =
    !inputs.title.isValid ||
    !inputs.date.isValid ||
    !inputs.entry.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Diary Entry</Text>
      <View style={styles.inputRow}>
        <Input
          style={styles.rowInput}
          label="Title"
          invalid={!inputs.title.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "title"),
            value: inputs.title.value,
          }}
        />
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
      </View>
      <Input
        label="Entry"
        invalid={!inputs.entry.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "entry"),
          value: inputs.entry.value,
        }}
      />
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
});
