import { FlatList, Text } from "react-native";
import DiaryItem from "./DiaryItem";

function renderDiaryItem(itemData) {
  return <DiaryItem {...itemData.item} />;
}

function DiaryList({ diaryentries }) {
  return (
    <FlatList
      data={diaryentries}
      renderItem={renderDiaryItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default DiaryList;
