import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import DiaryList from "./DiaryList";

function DiaryOutput({ diaryentries, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (diaryentries.length > 0) {
    content = <DiaryList diaryentries={diaryentries} />;
  }

  return (
    <View style={styles.container}>
      {content}
    </View>
  );
}

export default DiaryOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 80,
    backgroundColor: "white",
  },
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
