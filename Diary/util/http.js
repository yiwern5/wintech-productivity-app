import axios from "axios";

const BACKEND_URL =
"https://lifesync-d02e1-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function storeDiary(diaryData) {
  const response = await axios.post(
    BACKEND_URL + `/diary.json`,
    diaryData
  );

  const id = response.data.name;

  return id;
}

export async function fetchDiary() {
  const response = await axios.get(BACKEND_URL + `/diary.json`);

  const diaryentries = [];

  for (const key in response.data) {
    const diaryObj = {
      id: key,
      title: response.data[key].title,
      date: new Date(response.data[key].date),
      entry: response.data[key].entry,
      //mood: response.data[key].mood,
    };

    diaryentries.push(diaryObj);
  }

  return diaryentries;
}

export function updateDiary(id, diaryData) {
  return axios.put(BACKEND_URL + `/diary/${id}.json`, diaryData);
}

export function deleteDiary(id) {
  return axios.delete(BACKEND_URL + `/diary/${id}.json`);
}
