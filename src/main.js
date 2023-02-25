import { Notify } from "notiflix/build/notiflix-notify-aio";
import "./css/style.css";
import { formRef, listRef } from "./refs";
import { createMarkup } from "./markup";
import { createData } from "./utils";
import { saveMessage, load, save } from "./service";

init();

formRef.addEventListener("submit", onFormSubmit);
listRef.addEventListener("click", onDeleteBtnClick);
listRef.addEventListener("click", onTaskChecked);
listRef.addEventListener("click", onEditBtnClick);

function onFormSubmit(e) {
  e.preventDefault();

  const {
    message: { value },
  } = formRef.elements;

  const inputValue = value.trim();

  if (inputValue === "") {
    Notify.failure("You can not add an empty task!");
  }

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

function onDeleteBtnClick(e) {
  if (e.target.classList.contains("button__task")) {
    const liRef = e.target.closest(".item");
    const dataAttr = liRef.dataset.id;
    liRef.remove();
    const data = load();
    const filteredData = data.filter(({ id }) => id !== Number(dataAttr));
    save(filteredData);
  }
}

function onTaskChecked(e) {
  if (e.target.nodeName === "P") {
    e.target.classList.add("checked");
  }
}

function onEditBtnClick(e) {
  const field = e.target.closest(".item");
  const input = field.firstElementChild;

  if (e.target.innerText.toLowerCase() === "edit") {
    input.removeAttribute("readonly");
    input.focus();
    input.selectionStart = input.value.length;
    e.target.innerText = "Save";
  } else {
    input.setAttribute("readonly", "readonly");
    e.target.innerText = "Edit";
  }
}
