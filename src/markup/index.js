export function createMarkup(data) {
  return data
    .map(
      ({ value, id, checked }) => `<li class="item ${
        checked ? "checked" : ""
      }" data-id="${id}">
  <input type="text" class="input__text" value="${value}" readonly><button type="button" class="button__edit">Edit</button>
  <button type="button" class="button__task">Delete</button></input>
  
</li>`
    )
    .join("");
}
