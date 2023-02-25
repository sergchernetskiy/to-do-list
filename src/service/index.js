const LS_KEY = "message";

export function save(value) {
  try {
    const serializedData = JSON.stringify(value);
    localStorage.setItem(LS_KEY, serializedData);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

export function load() {
  try {
    const serializedState = localStorage.getItem(LS_KEY);
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

export function saveMessage(data) {
  const dataLocalStorage = load();

  dataLocalStorage.push(data);

  save(dataLocalStorage);
}
