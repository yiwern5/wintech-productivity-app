import { createContext, useReducer } from "react";

export const DiaryContext = createContext({
  diaryentries: [],
  addDiary: ({ title, entry, date, image }) => {},
  setDiary: (diaryentries) => {},
  deleteDiary: ({ id }) => {},
  updateDiary: (id, { title, entry, date, image}) => {},
});

function diaryReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const updatableDiaryIndex = state.findIndex(
        (diary) => diary.id === action.payload.id
      );

      const updatableDiary = state[updatableDiaryIndex];
      const updatedItem = { ...updatableDiary, ...action.payload.data };

      const updatedDiaryEntries = [...state];
      updatedDiaryEntries[updatableDiaryIndex] = updatedItem;

      return updatedDiaryEntries;
    case "DELETE":
      return state.filter((diary) => diary.id !== action.payload);
    default:
      return state;
  }
}

function DiaryContextProvider({ children }) {
  const [diaryState, dispatch] = useReducer(diaryReducer, []);

  function addDiary(diaryData) {
    dispatch({ type: "ADD", payload: diaryData });
  }

  function setDiary(diaryentries) {
    dispatch({ type: "SET", payload: diaryentries });
  }

  function deleteDiary(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateDiary(id, diaryData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: diaryData } });
  }

  const value = {
    diaryentries: diaryState,
    addDiary: addDiary,
    setDiary: setDiary,
    deleteDiary: deleteDiary,
    updateDiary: updateDiary,
  };

  return (
    <DiaryContext.Provider value={value}>
      {children}
    </DiaryContext.Provider>
  );
}

export default DiaryContextProvider;
