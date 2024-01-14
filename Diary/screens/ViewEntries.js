import { useContext, useEffect } from "react";
import DiaryOutput from "../components/DiaryOutput/DiaryOutput";
import { DiaryContext } from "../store/diary-context";
import { useUser } from "@clerk/clerk-expo";

function ViewEntries() {
  const diaryctx = useContext(DiaryContext);
  const { user } = useUser();
  const filteredDiaryEntries = diaryctx.diaryentries.filter((diary) => {
    return diary.email === user.primaryEmailAddress.emailAddress;
  });

  return (
    <DiaryOutput
      diaryentries={filteredDiaryEntries}
      fallbackText="No diary entries found!"
    />
  );
}
export default ViewEntries;
