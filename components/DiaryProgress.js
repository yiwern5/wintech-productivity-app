import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { useContext, useState, useEffect } from 'react';
import { Entypo, AntDesign } from '@expo/vector-icons';

import ErrorOverlay from '../Diary/components/UI/ErrorOverlay';
import LoadingOverlay from '../Diary/components/UI/LoadingOverlay';
import { DiaryContext } from '../Diary/store/diary-context';
import { fetchDiary } from '../Diary/util/http';
import { getDateMinusDays } from '../Diary/util/date';
import { useUser } from '@clerk/clerk-expo';

export default function DiaryProgress() {
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
        setError('Could not fetch entries!');
      }

      setIsFetching(false);
    }

    getDiary();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const today = new Date();
  const filteredDiaryEntries = diaryctx.diaryentries.filter((diary) => {
    return (
      diary.email === user.primaryEmailAddress.emailAddress &&
      diary.date.toDateString() === today.toDateString()
    );
  });

  const diaryToday = filteredDiaryEntries.length > 0;

  return (
    <View style={styles.container}>
      {diaryToday ? (
        <>
          <Entypo name="check" size={60} color="white" />
          <Text style={styles.subtitle}>today's entry written!</Text>
        </>
      ) : (
        <>
        <AntDesign name="clockcircleo" size={55} color="white" />
        <Text style={styles.subtitle}>write today's entry!</Text>
        </>
      )}
      <Text style={styles.title}>Diary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    width: 150,
    height: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
    color: Colors.tertiary,
    marginTop: 3,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 1,
    flexWrap: 'wrap',
    flexShrink: 1,
    lineHeight: 20,
  },
});
