import "./css/style.css";
import { formRef, listRef } from "./refs";
import { createMarkup } from "./markup";
import { createData } from "./utils";
import { saveMessage, load, save } from "./service";

init();

formRef.addEventListener("submit", onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const {
    message: { value },
  } = formRef.elements;

  const inputValue = value.trim();

  if (!inputValue) {
    return;
  }

  const data = createData(inputValue);
  saveMessage(data);
  addMarkup(createMarkup([data]));
  formRef.reset();
}

function addMarkup(markup) {
  listRef.insertAdjacentHTML("beforeend", markup);
}

function init() {
  const data = load();

  addMarkup(createMarkup(data));
}
