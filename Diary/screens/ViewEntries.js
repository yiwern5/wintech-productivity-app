import { useContext, useState, useEffect } from "react";
import DiaryOutput from "../components/DiaryOutput/DiaryOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { fetchDiary } from "../util/http";
import { DiaryContext } from "../store/diary-context";
import { useUser } from "@clerk/clerk-expo";

function ViewEntries() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const { user } = useUser();

  const diaryctx = useContext(DiaryContext);

  useEffect(() => {
    async function getDiary() {
      setIsFetching(true);
      try {
        const diary = await fetchDiary();

        diaryctx.setDiary(diary);
      } catch (error) {
        setError("Could not fetch entries!");
      }

      setIsFetching(false);
    }

    getDiary();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
