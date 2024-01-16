import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import DiaryForm from "../components/ManageDiary/DiaryForm";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import IconButton from "../components/UI/IconButton";
import TrashIcon from "../components/UI/TrashIcon";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { GlobalStyles } from "../constants/styles";
import { deleteDiary, storeDiary, updateDiary } from "../util/http";
import { DiaryContext } from "../store/diary-context";

function ManageDiary({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const diaryctx = useContext(DiaryContext);

  const editedDiaryId = route.params?.diaryId;
  const isEditing = !!editedDiaryId;

  const selectedDiary = diaryctx.diaryentries.find(
    (diary) => diary.id === editedDiaryId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Entry" : "Add Entry",
    });
  }, [navigation, isEditing]);

  async function deleteDiaryHandler() {
    setIsSubmitting(true);

    try {
      await deleteDiary(editedDiaryId);
      diaryctx.deleteDiary(editedDiaryId);

      navigation.goBack();
    } catch (error) {
      setError("Could not delete entry - please try again later");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(diaryData) {
    setIsSubmitting(true);
    setError(null);

    try {
      if (isEditing) {
        diaryctx.updateDiary(editedDiaryId, diaryData);
        await updateDiary(editedDiaryId, diaryData);
      } else {
        const id = await storeDiary(diaryData);

        diaryctx.addDiary({...diaryData, id: id});
      }

      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later!");
      setIsSubmitting(false);
    }
  }

  function handleConfirm() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={handleConfirm}/>;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <DiaryForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedDiary}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <TrashIcon
            name = "trash"
            color={GlobalStyles.colors.crimson}
            size={36}
            onPress={deleteDiaryHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageDiary;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "white"
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.mountbatten,
    alignItems: "center",
  },
});
