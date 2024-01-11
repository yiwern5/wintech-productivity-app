import { useContext } from "react";
import DiaryOutput from "../components/DiaryOutput/DiaryOutput";
import { DiaryContext } from "../store/diary-context";

function ViewEntries() {
  const diaryctx = useContext(DiaryContext);

  return (
    <DiaryOutput
      diaryentries={diaryctx.diaryentries}
      fallbackText="No diary entries found!"
    />
  );
}

export default ViewEntries;
